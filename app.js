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
var jwt = require('jsonwebtoken');
var jwt_validate = require('express-jwt');

// monkey patching error to support JSON.stringify()
if (!('toJSON' in Error.prototype))
Object.defineProperty(Error.prototype, 'toJSON', {
  value: function () {
    var alt = {};
    Object.getOwnPropertyNames(this).forEach(function (key) {
        alt[key] = this[key];
    }, this);
    return alt;
  },
  configurable: true,
  writable: true
})

dotenv.load();

var privateCert = fs.readFileSync('key.pem', 'utf8');
var idpCert = fs.readFileSync('idp_cert.pem', 'utf8').replace(/\r|\s|\n/g, '');
var cert = fs.readFileSync('cert.pem', 'utf8');


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
  decryptionPvk: privateCert,
  // Service Provider Certificate
  privateCert: privateCert,
  // Identity Provider's public key
  cert: idpCert,
  validateInResponseTo: false,
  disableRequestedAuthnContext: true
}, function(profile, done) {
  /*let user = {
	// Fill actual user with the properties you want
    id: profile['urn:mace:kuleuven.be:dir:attribute-def:KULAssocMigrateID'],
  };
  return done(null, user);
  */
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
	   res.status(200).json(req.user)
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
    //res.redirect('/');
    let user = req.user;
    let token = jwt.sign(user, 'shhhhhhared-secret', {
      expiresIn: 1440 // expires in 1 hour
    });
    res.redirect(`/authenticate?token=${token}`);
  }
);


// this can be a client route
app.get('/authenticate',
  function (req, res) {
    // client login page gets token and validates it via /validate-token
    req.redirect(`/validate-token?token=${req.query.token}`)
  }
);

app.get('/login/fail',
  function(req, res) {
    res.status(401).send('Login failed');
  }
);

app.get('/validate-token',
  jwt_validate({secret: 'shhhhhhared-secret'}),
  function(req, res) {
    res.status(200).send('Token validated');
  }
);

app.get('/Shibboleth.sso/Metadata',
  function(req, res) {
    res.type('application/xml');
	res.status(200).send(samlStrategy.generateServiceProviderMetadata(cert));
  }
);

// General error handler
app.use(function(err, req, res, next) {
  res.status(500).send(err)
});

var server = app.listen(process.env.PORT, function () {
  console.log('Listening on port %d', server.address().port)
});
