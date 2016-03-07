// Core module
var fs          = require('fs');
var cpath       = require('path');

var Route = require('./route');

var _verbose = true;
var _app = null;
var _controllers_path = null;
var _routes = {};
var _preUrl = '/';
var _bluePrint = false;
var _models = null;
var _permissions = null;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return letter.toUpperCase();
  }).replace(/\s|[-.]+/g, '');
}

function browseControllerObject(controller, path, ctrlName) {
    var routeSlug = null;
    var route = null;

    _routes[ctrlName] = {};
    if (_bluePrint && controller['generator']) {
        var model = _models.getModel(camelize(ctrlName));
        browseControllerObject(_bluePrint(model), path, ctrlName);
    }
    for (actionName in controller) {
        action = controller[actionName];
        for (verbName in action) {
            var route = null;
            routeSlug = cpath.join(verbName, path, actionName);
            if (typeof action[verbName] == 'function')
                route = new Route(verbName, action[verbName], null, cpath.join(path, actionName), null);
            else
                route = new Route(verbName, action[verbName].action, action[verbName].level, cpath.join(path, actionName), _permissions);
            _routes[ctrlName][routeSlug] = route;
        }
    }
}

function browseFolder(app, filePath) {
    fs
    .readdirSync(cpath.join(_controllers_path, filePath))
    .forEach(function (file)
    {
        if (file.indexOf('.js') == -1) {
            browseFolder(app, file);
        }
        else {
            var ctrlName  = file.substr(0, file.length - 3);
            var path = cpath.join(_preURL, filePath, ctrlName);
            var controller = require(cpath.join(_controllers_path, filePath, ctrlName));
            browseControllerObject(controller, path, ctrlName);
        }
    });
}

function generateRoutes() {
    for (i in _routes) {
        if (_verbose) {
            console.log("\n["+ i +"]");
        }
        for (j in _routes[i]) {
            if (_verbose) {
                _routes[i][j].log();
            }
            _routes[i][j].create(_app);
        }
    }
}

module.exports.load = function(app, options) {
    if (!app) {
        throw new TypeError('Expected a express app in first argument');
    }
    _app = app;
    if (!options.controllers_path || typeof options.controllers_path !== 'string') {
        throw new TypeError('Expected a controllers path in options');
    }
    if (options) {
        _verbose = options.verbose || false;
        _controllers_path = options.controllers_path;
        _preURL = options.preURL || '/';
        if (options.bluePrint) {
            _bluePrint = options.bluePrint.functions || false;
            _models = options.bluePrint.models || false;
        }
        _permissions = options.permissions || null;
    }
    if (_verbose) console.log('\n======== ROUTES ========')
    browseFolder(app, '');
    generateRoutes();
    if (_verbose) console.log('\n========================');
    _routes = undefined;
}
