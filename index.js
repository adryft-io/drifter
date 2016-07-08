var app = require('express')();
var proxy = require('express-http-proxy');

app.use('/v1/auth', proxy(process.env.AUTH_SERVICE_URL, {
  filter: function(req,res) {
    var endPoint = require('url').parse(req.url).path;
    console.log('endPoint from filter is', endPoint);
    if (endPoint === '/verify' || endPoint === '/connect/gmail?'
    || endPoint === '/logout'  || endPoint === '/connect/google'
    || endPoint === '/connect/callbak') {
      return require('url').parse(req.url).path; 
    }
  },
  forwardPath: function(req, res) {
    console.log('endPoint from forwardPath is', require('url').parse(req.url).path);
    return require('url').parse(req.url).path;
  }
}));    
app.use('/v1/formulae', proxy(process.env.FORMULAE_SERVICE_URL, {
  forwardPath: function(req, res) {
    return '/v1/formulae' + require('url').parse(req.url).path;
  }
}));
app.use('/v1/elements', proxy(process.env.FORMULAE_SERVICE_URL, {
  forwardPath: function(req, res) {
    return '/v1/elements' + require('url').parse(req.url).path;
  }
}));
app.use('/v1/twilio', proxy(process.env.FORMULAE_SERVICE_URL, {
  forwardPath: function(req, res) {
    return '/v1/twilio' + require('url').parse(req.url).path;
  }
}));

app.listen(process.env.PORT || 3000);