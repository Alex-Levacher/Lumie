const postCars = require('./cars-post.action');
const getCars = require('./cars-get.action');

module.exports = {
    '/': {
        post: {
            middlewares: postCars.middlewares,
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
    }
};
