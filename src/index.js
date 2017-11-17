// Core module
const fs = require('fs');
const cpath = require('path');
const mm = require('micromatch');

const Route = require('./route');

let _verbose = true;
let _app = null;
let _controllersPath = null;
let _routes = {};
let _preURL = null;
let _bluePrint = false;
let _models = null;
let _permissions = null;
let _ignore = [];


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, letter => letter.toUpperCase()).replace(/\s|[-.]+/g, '');
}

function browseControllerObject(controller, path, ctrlName) {
    let routeSlug = null;

    const keyName = path
    .split('/')
    .filter(item => (item && item !== _preURL))
    .map(item => capitalize(item))
    .join(' > ');

    _routes[keyName] = {};
    if (_bluePrint && controller.generator) {
        const model = _models.getModel(camelize(ctrlName));
        browseControllerObject(_bluePrint(model), path, ctrlName);
    }
    for (const actionName in controller) {
        if (actionName === 'rename') break;
        const action = controller[actionName];
        for (const verbName in action) {
            let route = null;
            routeSlug = cpath.join(verbName, path, actionName);
            if (typeof action[verbName] === 'function') {
                route = new Route(
                    verbName,
                    action[verbName],
                    null,
                    cpath.join(path, actionName),
                    null
                );
            } else {
                route = new Route(
                    verbName,
                    action[verbName].action,
                    action[verbName].level,
                    cpath.join(path, actionName),
                    _permissions,
                    action[verbName].middlewares
                );
            }
            _routes[keyName][routeSlug] = route;
        }
    }
}

function browseFolder(app, filePath, fake) {
    fs.readdirSync(filePath)
    .forEach((file) => {
        if (file.indexOf('.js') === -1) {
            browseFolder(app, cpath.join(filePath, file), cpath.join(fake, file));
        } else {
            const realCtrlName = file.substr(0, file.length - 3);
            let finalCtrlName = realCtrlName;
            let concerned = false;

            if (_ignore && _ignore.length) {
                concerned = mm.isMatch(realCtrlName, _ignore);
            }
            if (concerned) return;
            const controller = require(cpath.join(filePath, realCtrlName));
            if (controller.rename !== undefined) {
                finalCtrlName = controller.rename;
            }
            const path = cpath.join('/', _preURL, fake, finalCtrlName);
            browseControllerObject(controller, path, finalCtrlName);
        }
    });
}

function generateRoutes() {
    for (const i in _routes) {
        if (_verbose) {
            console.log(`\n[${i}]`);
        }
        for (const j in _routes[i]) {
            if (_verbose) {
                _routes[i][j].log();
            }
            _routes[i][j].create(_app);
        }
    }
}

module.exports.load = function (app, options) {
    if (!app) {
        throw new TypeError('Expected a express app in first argument');
    }
    _app = app;
    if (!options.controllers_path || typeof options.controllers_path !== 'string') {
        throw new TypeError('Expected a controllers path in options');
    }
    if (options) {
        _verbose = options.verbose || false;
        _controllersPath = options.controllers_path;
        _preURL = options.preURL;
        _ignore = options.ignore;
        if (options.bluePrint) {
            _bluePrint = options.bluePrint.functions || false;
            _models = options.bluePrint.models || false;
        }
        _permissions = options.permissions || null;
    }
    if (_verbose) console.log('\n======== ROUTES ========');
    browseFolder(app, cpath.join(_controllersPath), '/');
    generateRoutes();
    if (_verbose) console.log('\n========================');
    _routes = undefined;
};
