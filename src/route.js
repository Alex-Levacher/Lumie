
function Route(verb, func, level, path, permissions) {
    this.verb = verb;
    this.action = func;
    this.level = level;
    this.path = path;
    this.permissions = permissions;
}

Route.prototype.create = function (app) {
    if (this.permissions) {
        app[this.verb](this.path, this.permissions(this.level), this.action);
        return;
    }
    app[this.verb](this.path, this.action);
};

Route.prototype.log = function (app) {
    console.log("\t" + this.level + "\t" + this.verb + "\t[" + this.path + "]");
};

module.exports = Route;
