const fs = require('fs');
const cpath = require('path');
const mm = require('micromatch');

const Route = require('./route');
const logger = require('./logger');
const validators = require('./validators');
const { capitalize } = require('./helpers');

const _routes = {};
const _options = {};

function browseControllerObject(ctrlDefinition, path) {
    const keyName = path.split('/')
    .filter(item => (item && item !== _options.preURL))
    .map(item => capitalize(item))
    .join(' > ');

    _routes[keyName] = {};
    if (ctrlDefinition.path) delete ctrlDefinition.path;
    for (const actionName in ctrlDefinition) {
        const action = ctrlDefinition[actionName];
        for (const verbName in action) {
            const routeID = cpath.join(verbName, path, actionName);
            _routes[keyName][routeID] = new Route({
                verb: verbName,
                action: action[verbName].action,
                level: action[verbName].level,
                path: cpath.join(path, actionName),
                permissions: _options.permissions,
                middlewares: action[verbName].middlewares
            });
        }
    }
}

function browseDirectory(filePath, urlPath) {
    fs.readdirSync(filePath)
    .forEach((file) => {
        const curtFilePath = cpath.join(filePath, file);
        const stats = fs.statSync(curtFilePath);
        if (stats.isDirectory()) {
            return browseDirectory(curtFilePath, cpath.join(urlPath, file));
        }
        let realCtrlName = file.substr(0, file.length - 3);
        if (_options.ignore && _options.ignore.length) {
            const match = mm.isMatch(realCtrlName, _options.ignore);
            if (match) return false;
        }

        /* eslint global-require: 0 */
        const controller = require(cpath.join(filePath, realCtrlName));

        if (_options.routingFiles && mm.isMatch(realCtrlName, _options.routingFiles)) {
            realCtrlName = '';
        }
        if (controller.path) {
            realCtrlName = controller.path;
        }
        const path = cpath.join('/', _options.preURL, urlPath, realCtrlName);
        return browseControllerObject(controller, path);
    });
}

function generateRoutes(app) {
    for (const i in _routes) {
        logger.log(`\n[${i}]`);
        for (const j in _routes[i]) {
            logger.log(_routes[i][j].desc());
            _routes[i][j].create(app);
        }
    }
}

module.exports.load = function (app, options = {}) {
    if (!app) {
        throw new Error('Expected an express app as first argument');
    }

    const initOptionsFcts = {
        controllers_path: validators.ctrlsPath,
        verbose: validators.verbose,
        ignore: validators.ignore,
        preURL: validators.preURL,
        permissions: validators.permissions,
        routing_files: validators.routingFiles
    };

    for (const key in initOptionsFcts) {
        initOptionsFcts[key](options[key], _options);
    }

    logger.verbose = _options.verbose;
    logger.log('\n======== ROUTES ========');
    browseDirectory(cpath.join(_options.controllersPath), '/');
    generateRoutes(app);
    logger.log('\n========================');
};
