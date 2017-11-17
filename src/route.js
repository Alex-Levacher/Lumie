function Route(verb, func, level, path, permissions, middlewares = []) {
    this.verb = verb;
    this.action = func;
    this.level = level;
    this.path = path;
    this.permissions = permissions;
    this.middlewares = middlewares;
}

function JoinPathSlash(path) {
    return path.replace(/\\/g, '/');
}

Route.prototype.create = function (app) {
    if (this.permissions) {
        app[this.verb](
            JoinPathSlash(this.path),
            this.permissions(this.level),
            this.middlewares,
            this.action
        );
        return;
    }
    app[this.verb](JoinPathSlash(this.path), this.middlewares, this.action);
};

Route.prototype.log = function () {
    console.log(`\t${this.level}\t${this.verb}\t[${JoinPathSlash(this.path)}]`);
};

module.exports = Route;
