
const bookActions = require('./books.actions');

const middle01 = function (req, res, next) {
    console.log('MIDDLE01');
    next();
};

const middle02 = function (req, res, next) {
    console.log('MIDDLE02');
    next();
};

module.exports = {
    '/': {
        get: {
            action: bookActions.getBooks,
            middlewares: [middle01, middle02],
            level: 'public'
        }
    },
    rename: 'books'
};
