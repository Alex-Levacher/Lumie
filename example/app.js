const express = require('express');
const path = require('path');
const expressCtrl = require('../src');
const permissions = require('./permissions');

const app = express();

/**
** When the following code is commented, the route: /api/minimal/number/:value
** should return a 401 error because a user is not logged
* */
app.use((req, res, next) => {
    req.user = {};
    next();
});

expressCtrl.load(app, {
    verbose: true,
    preURL: 'api',
    ignore: ['*.specs', '*.actions'],
    permissions,
    controllers_path: path.join(__dirname, 'controllers')
});

const server = app.listen(3000, '127.0.0.1', () => {
    const { address, port } = server.address();
    console.log('Example app listening at http://%s:%s', address, port);
});
