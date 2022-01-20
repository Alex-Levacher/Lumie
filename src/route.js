const { joinPathSlash } = require('./helpers');

class Route {
    constructor(options) {
        this.verb = options.verb;
        this.action = options.action;
        this.level = options.level;
        this.path = options.path;
        this.permissions = options.permissions;
        this.middlewares = options.middlewares || [];
        this.comment = options.comment || '';
    }

    create(app) {
        if (this.permissions) {
            app[this.verb](
                joinPathSlash(this.path),
                this.permissions(this.level),
                this.middlewares,
                this.action
            );
            return;
        }
        app[this.verb](joinPathSlash(this.path), this.middlewares, this.action);
    }

    desc() {
        return `\t${this.level}\t${this.verb}\t[${joinPathSlash(this.path)}]\t${this.comment}`;
    }
}

module.exports = Route;
