const postCars = require('./create-cars.action');
const getCars = require('./get-cars.action');

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
