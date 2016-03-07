var express     = require('express');
var path        = require('path');
var expressCtrl = require('express-controllers-loader');
var permissions = require('./permissions')

var app = express();

// When the following code is commented, the route : /api/example-ctrl/number/:value should return a 401 error because a user is not logged
// app.use(function(req, res, next) {
//     req.user = {};
//     next();
// })

expressCtrl.load(app, {
    verbose : true,
    preURL : '/api',
    permissions: permissions,
    controllers_path : path.join(__dirname, 'controllers')
});

var server = app.listen(3000, '127.0.0.1', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
