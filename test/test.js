
var xmlCrypto = require('xml-crypto');
var FileKeyInfo = require('xml-crypto').FileKeyInfo;
var xpath = xmlCrypto.xpath;
var xmldom = require('xmldom');
var fs = require('fs');


let validateSignature = function (fullXml, currentNode, certs) {
  var self = this;
  var xpathSigQuery = ".//*[local-name(.)='Signature' and " +
                      "namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']";
  var signatures = xpath(currentNode, xpathSigQuery);
  // This function is expecting to validate exactly one signature, so if we find more or fewer
  //   than that, reject.
  if (signatures.length != 1)
    return false;
  var signature = signatures[0];
  //console.log(signature.toString())
  return certs.some(function (certToCheck) {
    return validateSignatureForCert(signature, certToCheck, fullXml, currentNode);
  });
};

// This function checks that the |signature| is signed with a given |cert|.
let validateSignatureForCert = function (signature, cert, fullXml, currentNode) {
  var self = this;
  var sig = new xmlCrypto.SignedXml();
  sig.keyInfoProvider = {
    getKeyInfo: function (key) {
      return "<X509Data></X509Data>";
    },
    getKey: function (keyInfo) {
      //return self.certToPEM(cert);
      console.log(cert)
      return cert
    }
  };
  //sig.keyInfoProvider = new FileKeyInfo("./metadata.associatie.kuleuven.be.crt")
  sig.loadSignature(signature);
  // We expect each signature to contain exactly one reference to the top level of the xml we
  //   are validating, so if we see anything else, reject.
  if (sig.references.length != 1 )
    return false;
  var refUri = sig.references[0].uri;
  var refId = (refUri[0] === '#') ? refUri.substring(1) : refUri;
  // If we can't find the reference at the top level, reject
  var idAttribute = currentNode.getAttribute('ID') ? 'ID' : 'Id';
  if (currentNode.getAttribute(idAttribute) != refId)
    return false;
  // If we find any extra referenced nodes, reject.  (xml-crypto only verifies one digest, so
  //   multiple candidate references is bad news)
  var totalReferencedNodes = xpath(currentNode.ownerDocument,
                                  "//*[@" + idAttribute + "='" + refId + "']");
  if (totalReferencedNodes.length > 1)
    return false;
  console.log("checking signature....")
  var ok = sig.checkSignature(fullXml);
  console.log(sig.validationErrors)
  return ok;
};


var xml = fs.readFileSync('response.xml').toString();

var doc = new xmldom.DOMParser({}).parseFromString(xml);
var elements;
elements = doc.getElementsByTagName('ds:SignatureValue');
for (var i = 0; i < elements.length; i++) {
  elements[i].childNodes[0].textContent = elements[i].childNodes[0].textContent.replace(/\s+/g, '')
  //console.log(elements[i].childNodes[0].textContent)
}
elements = doc.getElementsByTagName('ds:X509Certificate');
for (var i = 0; i < elements.length; i++) {
  elements[i].childNodes[0].textContent = elements[i].childNodes[0].textContent.replace(/\s+/g, '')
  //console.log(elements[i].childNodes[0].textContent)
}
elements = doc.getElementsByTagName('xenc:CipherValue');
for (var i = 0; i < elements.length; i++) {
  elements[i].childNodes[0].textContent = elements[i].childNodes[0].textContent.replace(/\s+/g, '')
  //console.log(elements[i].childNodes[0].textContent)
}

xml = new xmldom.XMLSerializer().serializeToString(doc)
fs.writeFileSync('response2.xml', xml)


var certs = [
  fs.readFileSync('metadata.associatie.kuleuven.be.crt').toString(),
]

validateSignature(xml, doc.documentElement, certs)
