const fs = require('fs');

function ctrlsPath(value, options) {
    if (!value || typeof value !== 'string') {
        throw new Error('Expected a controllers path in options to be a string');
    }
    if (!fs.existsSync(value)) throw new Error('The controller path is incorrect');
    options.controllersPath = value;
}

function verbose(value, options) {
    if (value && typeof value !== 'boolean') {
        throw new Error('Expected verbose to be a boolean');
    }
    options.verbose = value;
}

function ignore(value, options) {
    if (value && !Array.isArray(value)) {
        throw new Error('Expected ignore to be an Array');
    }
    options.ignore = value;
}

function preURL(value, options) {
    if (value && typeof value !== 'string') {
        throw new Error('Expected preURL to be a string');
    }
    options.preURL = value;
}

function permissions(value, options) {
    if (value && typeof value !== 'function') {
        throw new Error('Expected permissions to be a function');
    }
    options.permissions = value;
}

module.exports = {
    ctrlsPath,
    verbose,
    ignore,
    preURL,
    permissions
};
