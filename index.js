var app = require('express')();
var requestProxy = require('express-request-proxy');

app.all('/v1/recipes', requestProxy({
  url: process.env.RECIPES_SERVICE_URL + '/v1/recipes'
}));

app.all('/v1/auth/*', requestProxy({
  url: process.env.AUTH_SERVICE_URL + '/*'
}));

app.listen(process.env.PORT || 3000);
