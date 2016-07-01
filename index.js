var app = require('express')();
var proxy = require('express-http-proxy');

app.use('/v1/auth', proxy(process.env.AUTH_SERVICE_URL));
app.use('/v1/recipes', proxy(process.env.RECIPES_SERVICE_URL, {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

app.listen(process.env.PORT || 3000);
