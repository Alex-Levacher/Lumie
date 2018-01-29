const { JoinPathSlash } = require('./helpers');

class Route {
    constructor(options) {
        this.verb = options.verb;
        this.action = options.action;
        this.level = options.level;
        this.path = options.path;
        this.permissions = options.permissions;
        this.middlewares = options.middlewares || [];
    }

    create(app) {
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
    }

    inspect() {
        return `\t${this.level}\t${this.verb}\t[${JoinPathSlash(this.path)}]`;
    }
}

module.exports = Route;
