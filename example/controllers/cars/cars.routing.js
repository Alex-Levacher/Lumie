const postCars = require('./post-cars.actions');
const getCars = require('./get-cars.actions');

module.exports = {
    '/': {
        post: {
            middlewares: postCars.middlewares, // optional
            action: postCars.action,
            level: 'public'
        },
        get: {
            action: getCars.getAll,
            level: 'public'
        }
    },
    '/:id': {
        get: {
            action: getCars.getOne,
            level: 'public'
        }
    },
    rename: ''
};
