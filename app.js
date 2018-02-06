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
+96uEG4Gli9Z/xWRMafoPaNTakMiNZA=
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
MIIFXTCCA0WgAwIBAgIJAL7HobNYSW6AMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAlVTMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTgwMjA2MjE1OTEzWhcNMjAwNzI1MjE1OTEzWjBF
MQswCQYDVQQGEwJVUzETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIIC
CgKCAgEA1KmvExsuQUERkEC3UEoawaodzvI72ksgilv+iNqrcwibRgSN57Cszydm
M9Bu4f5sAnxLhH40Uf8JLf1JBmuNUh1PG3DwKrkqiDndrFkwGlk4KBmqhouozx/+
soW9pZlnyF3U0SHtU3x7uE+x846YzqRmrlsOxLLJFM/pe/qCfNLLaiY5zYgrtPIf
ETK2Di6nySm60/4GyGPT97K5zEuIwJ/eYMc1i/fb767dWAXyv/jZk9uVI9DgYqGa
FSgyh/+stny+exhxJkO47e0KstGPOqn8/TeiYpP2Ru78rRDPA3nG6ACH70SparZe
YXYTdUgm8abgNYwSClca5bZMDgHp2vDZpWokdShQhKVngVUJFw0heaCeqLRWEhHY
1mrKEMjkmflDZh8G+5eNiWrzh6PBmtW2y7wUxSoIR49V0XpDk+0oewpZBTtK7kpp
Xq4zQKnWkEmPDM2gkHF1hIeY8v22gVN0xPpyDTkPpwuCDpYU0lM/6upfJl2BtVRr
VCN0gmkp9MDp6l8IGCCMKc66JL6qtSIcSQBVRM3ITUiWnlkJwXNayOCg3lL8RrgF
0DkdKPRkvjhKJ944349w3gB+kRyDI+TbmcQwZIhozLAFSthES29d6/I7bfRA9jVd
yjm3wl3Wp3J4N5O8w8hnUU//Wh7/yUvPXrQZScXmI6u0qtQdXnkCAwEAAaNQME4w
HQYDVR0OBBYEFOFAqMheqvfG1EjMncgjdFcMXldJMB8GA1UdIwQYMBaAFOFAqMhe
qvfG1EjMncgjdFcMXldJMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggIB
ALkv+8fTJydjnwrYP+3RkKntCHcqS7FZh7YFG/XdtVpet+2T+LDxvNawBChXJ89e
BJmbYjazUvWNX1gvfq7ppVIWhSNOIC+HU5WKuBBuMQ+tztVMNNm5iLJ9ldQcQTo/
WMzHzdfN+JM6JV9v6jjHlkbIJtm/XIGHZ8wtu3nSoXQ3q4wopUORJboO+VP1QoE3
TuvHNRVTaX+vInZ10oD16dyA6xXAyt3qUdoYetthOpG2dvoqhebHu7oTrp/GcIT2
Jwz4Il3oa8i3W+NRQqRBFcEqDEBTtKZASDXLsUBcNGd0QneZ/cbNUqDMgjbF3I1L
QZxIA0KKGhr0j6sB9QfovvYmLWQRuaRGNBi0AOpkbQVUotBRc6ozNzsCZrX+HySN
FJCfCGZbpv3PdO7Am1cuzISr13/XAn4i7cA1CpbqnQWwo/Kj/Rlf98Fwc+AZgPkp
JlckoXKA3YFn95B5+lAcHUpwkkZaqImmaYausFN9siMYn4s2gzh2EhboITreqvo4
XOneTxTiPW7hooxsnU/DdNxSpaE87kcUevjwrMdruxATRhmCUunXVDWooiYzNMio
YkW6b5mE6cZetVGGXTl/VQjFToVFrdAIlRFb9uDKKvijKfoYIWnI3oH/VT1toQ+B
hUWgh/05Le/wZiXl7EzwbiCXSBF6aiOZmtThBSnRqRrr
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
