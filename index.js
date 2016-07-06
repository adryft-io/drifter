var app = require('express')();
var proxy = require('express-http-proxy');

app.use('/v1/auth', proxy(process.env.AUTH_SERVICE_URL));
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

app.listen(process.env.PORT || 3000);
