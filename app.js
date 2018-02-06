var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require("express");
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var saml = require('passport-saml');

dotenv.load();

var privateCert = `
-----BEGIN PRIVATE KEY-----
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
6X08Is6t0vakGZPywPpjgHXiRDdJvQ==
-----END PRIVATE KEY-----
`;

var idp_cert = `
-----BEGIN CERTIFICATE-----
MIIFhzCCBG+gAwIBAgIQAtlTnAkdHJNY+aEDhIrJlDANBgkqhkiG9w0BAQsFADBk
MQswCQYDVQQGEwJOTDEWMBQGA1UECBMNTm9vcmQtSG9sbGFuZDESMBAGA1UEBxMJ
QW1zdGVyZGFtMQ8wDQYDVQQKEwZURVJFTkExGDAWBgNVBAMTD1RFUkVOQSBTU0wg
Q0EgMzAeFw0xNjEwMjgwMDAwMDBaFw0xOTExMDYxMjAwMDBaMIG+MQswCQYDVQQG
EwJCRTEXMBUGA1UECBMOVmxhYW1zLUJyYWJhbnQxDzANBgNVBAcTBkxldXZlbjEq
MCgGA1UEChMhS2F0aG9saWVrZSBVbml2ZXJzaXRlaXQgdGUgTGV1dmVuMS8wLQYD
VQQLEyZDb21wZXRlbmNlIENlbnRyZSBJbmZvcm1hdGlvbiBTZWN1cml0eTEoMCYG
A1UEAxMfbWV0YWRhdGEuYXNzb2NpYXRpZS5rdWxldXZlbi5iZTCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAK6RDLRzLxLBNP0dvl2UgKrKNDWuLysdCkrV
j0UG1E+8JL1MBQ9IU/eSSOFDQHNX7/Co+tOcmXvcKIzE2V2wiijpOQ7kElC4QTT2
CLLhEbvfYd8d167+s46+AuzPGbY+x0UmUsZOE7Cnkd5w+OS/wMRK+IMzfAK7U/Dl
+3wrwjRgX4HE96RWdBrOm6ohx34nQUHeEcjLnDMZuR1fDJq+TOiiXFk5/xJNiVEP
EeKbtkFnnCLe632hs39IkY71pTVnpgtzlE1NAC9WreLIbe/YXaJSkHrgI2/HuFqr
uQEj7UMGTJag30TtuqW6t6nSZc7/Boh4Q4zBRZo+7CSXzxe0VxUCAwEAAaOCAdgw
ggHUMB8GA1UdIwQYMBaAFGf9iCAUJ5jHCdIlGbvpURFjdVBiMB0GA1UdDgQWBBTJ
qQmcbT7cAg6sBE6Y7Wwiu12iWzAqBgNVHREEIzAhgh9tZXRhZGF0YS5hc3NvY2lh
dGllLmt1bGV1dmVuLmJlMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEF
BQcDAQYIKwYBBQUHAwIwawYDVR0fBGQwYjAvoC2gK4YpaHR0cDovL2NybDMuZGln
aWNlcnQuY29tL1RFUkVOQVNTTENBMy5jcmwwL6AtoCuGKWh0dHA6Ly9jcmw0LmRp
Z2ljZXJ0LmNvbS9URVJFTkFTU0xDQTMuY3JsMEwGA1UdIARFMEMwNwYJYIZIAYb9
bAEBMCowKAYIKwYBBQUHAgEWHGh0dHBzOi8vd3d3LmRpZ2ljZXJ0LmNvbS9DUFMw
CAYGZ4EMAQICMG4GCCsGAQUFBwEBBGIwYDAkBggrBgEFBQcwAYYYaHR0cDovL29j
c3AuZGlnaWNlcnQuY29tMDgGCCsGAQUFBzAChixodHRwOi8vY2FjZXJ0cy5kaWdp
Y2VydC5jb20vVEVSRU5BU1NMQ0EzLmNydDAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3
DQEBCwUAA4IBAQAA3aDz3YW7NEAnnSzKic6TWDPZSR559JP+t9gEEYZU20Q4K412
FvszcV3YfghheEddMCencZLuE9eoK3GtfC7k06FTje1qse6/aEkjTd4Whiy7W7+K
oN2fdzNRTQ4e3tuUyW4ytgKcZzsn0wbCrjJOo6fCalOcsfEGKCP6AqX+KoeveYJC
+QGVpgWGm4NqeEqce6Y+eKUvNQir+12rLb7ISST3Oxkkl8b8RM2eZ/CkjXsUf2BR
A+Y0/vTFl0KTwpDz4lpiRRmFC9zAi/DmfKlsSdLrhg911Ql6h5LpVyK+B84P7ERD
9p3NrRA62vk2VOOQ91EBU1zHYQJKrOArIt5n
-----END CERTIFICATE-----
`;

var cert = `
-----BEGIN CERTIFICATE-----
MIIFeTCCA2GgAwIBAgIJAKAA+BdhvJhiMA0GCSqGSIb3DQEBCwUAMFMxCzAJBgNV
BAYTAkJFMRAwDgYDVQQIDAdCZWxnaXVtMSEwHwYDVQQKDBhJbnRlcm5ldCBXaWRn
aXRzIFB0eSBMdGQxDzANBgNVBAMMBkRhdmlkZTAeFw0xODAyMDYyMzE5NDFaFw0y
MDA3MjUyMzE5NDFaMFMxCzAJBgNVBAYTAkJFMRAwDgYDVQQIDAdCZWxnaXVtMSEw
HwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQxDzANBgNVBAMMBkRhdmlk
ZTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAKp795zmostPZoxkeHVp
WbWULSPUs3JxqMLhI26uPMh+BAsupuckIxbQ3z8SY8HrvcyRaejs9NHY384+asDk
2qAuHhuS6Ddk+gdY5V6cXPppcBVdvft7SpYKz8niMu9gGcmNJ542YloHgzqF9U71
WEERx8hYo4h9mGb3RqI2yhJVcmDttiICqRHavNkMch7ZkqH+KYcprZ1vJZGtbSIC
gRvDzjAT3XL64hk9HOn3ykcQX83V1hqoCsoAt+rdv60lSfU5fQQsT2/WinqQSg4M
PUBksCKMO6/+nB+SLWmjOdc+SZpOxZ0l0Y5bnzExoDEhK7xy4GUZrl1INdtPjxxa
UyW/sQgO5QvEgEOdVlxfpJJBXa9enXIWp8KPbbGpiDpL0ZIv1pW+2GvUA3TfsLLR
2ZAzCuHBDa7jFhNhh1YZoLubvbsvsW85+oCTJRGNqoTROE3sH7HIAIRxZXdoNlmw
VqkmPyTQ/BPFWHVsSZhRYCM5ivkjf75poOzxqfhE0pdT6ox9K2ZA9PiohTgSbJSX
k6AnCY/+I8ydhbebo3tgFxeinw88lXBf8LbJ0lehx/kWJfdzVd8Q78vs7v9rKvWK
yV5kacbw3qE3EghGMnDcQg4tZmJOTk/iS87nxOsDcq15PHK0LpvXasGsvLyG7fdu
T/EbfrdJYRUK7NJ+geUn1bCxAgMBAAGjUDBOMB0GA1UdDgQWBBTxei/AdzgkiIB7
dtuSETfo2PxfcDAfBgNVHSMEGDAWgBTxei/AdzgkiIB7dtuSETfo2PxfcDAMBgNV
HRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4ICAQBH0huYzjdR432JsTDTJrzyaNbz
0O2nV3wERb2exdD4uJlWfv9RUefh+Bzsy1rjsDkOE0D0gtmvjLrIm87aY+UgLFKB
WOdN1Uh8dqJCKAK2zdwvv/mjwBcEcAn/qnmfXglAEQqkmRiTGDdX9gHRpajF1Ua/
BKrFTg4oaVpgPiigO1FigzOVpqOgIPKenwRDJ9FfMZwZVBeppe7NLp+TuTJ9FUIS
tj/bXYVOkaDhQDOQhac6yP2HBa94AdxWN0ks8ksbi1kHlHjVWtTejfeXObkyke36
SPyV62E8XnsQgodR/evP1+rdDqxWEyp+tJisMEaNb7Ypgc2gI2reFXsD2cdNNNIC
xW1QkvBKFog3NwO0LP6Kfe9cWIC/gtPBKFYn8RCaigP4kCYl/xCucTWZtp0kQljL
lHQTbzazWHJdcHa63GjpMJnWrLiSkuAwPvDs5DXSLLM1Rf67CxtLI9F27Zmed2Av
pfZezr9ogiP2+axftdkQIezKrQJd/QnJsFziIgZ1WCCuQOIYlb3nr7UPtQaFoFMK
rX/6T/Y45hIjah+jIymwoTsvbxxGA26Y62p8F8SRshNzx+9VICQWkTxwjDcXIvJs
GKZpQrNfpEtwkpCqWSd/g9cN5UDMKW/1N1s3cXsgmvw5AdzosHPogUblOaApF1TP
91GoqfGReQdHbqBOdg==
-----END CERTIFICATE-----
`;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var samlStrategy = new saml.Strategy({
  // URL that goes from the Identity Provider -> Service Provider
  callbackUrl: process.env.CALLBACK_URL,
  // URL that goes from the Service Provider -> Identity Provider
  entryPoint: process.env.ENTRY_POINT,
  // Usually specified as `/shibboleth` from site root
  issuer: process.env.ISSUER,
  identifierFormat: null,
  // Service Provider private key
  //decryptionPvk: fs.readFileSync(path.join(path.resolve(__dirname), 'cert/key.pem'), 'utf8'),
  decryptionPvk: privateCert,
  // Service Provider Certificate
  //privateCert: fs.readFileSync(path.join(path.resolve(__dirname), 'cert/key.pem'), 'utf8'),
  privateCert: privateCert,
  // Identity Provider's public key
  //cert: fs.readFileSync(path.join(path.resolve(__dirname), 'cert/idp_cert.pem'), 'utf8'),
  cert: cert,
  validateInResponseTo: false,
  disableRequestedAuthnContext: true
}, function(profile, done) {
  return done(null, profile);
});

passport.use(samlStrategy);

var app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    return res.redirect('/login');
}

app.get('/',
  ensureAuthenticated,
  function(req, res) {
    res.send('Authenticated');
  }
);

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  function (req, res) {
    res.redirect('/');
  }
);

app.post('/login/callback',
   passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/login/fail',
  function(req, res) {
    res.status(401).send('Login failed');
  }
);

app.get('/Shibboleth.sso/Metadata',
  function(req, res) {
    res.type('application/xml');
    //res.status(200).send(samlStrategy.generateServiceProviderMetadata(fs.readFileSync(path.join(path.resolve(__dirname), 'cert/cert.pem'), 'utf8')));
	res.status(200).send(samlStrategy.generateServiceProviderMetadata(cert));
  }
);

//general error handler
app.use(function(err, req, res, next) {
  console.log("Fatal error: " + JSON.stringify(err));
  next(err);
});

var server = app.listen(process.env.PORT, function () {
  console.log('Listening on port %d', server.address().port)
});
