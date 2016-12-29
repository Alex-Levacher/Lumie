const escapeStringRegexp = require('escape-string-regexp');

function Route(verb, func, level, path, permissions) {
    this.verb = verb;
    this.action = func;
    this.level = level;
    this.path = path;
    this.permissions = permissions;
}

function JoinPathSlash(path){
    var res = path.replace(/\\/g, '/');
    return res;
}
Route.prototype.create = function (app) {
    if (this.permissions) {
        app[this.verb](JoinPathSlash(this.path), this.permissions(this.level), this.action);
        return;
    }
    app[this.verb](JoinPathSlash(this.path), this.action);
};

Route.prototype.log = function (app) {
    console.log("\t" + this.level + "\t" + this.verb + "\t[" + JoinPathSlash(this.path) + "]");
};

module.exports = Route;
