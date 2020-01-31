import { basicActionMethod } from '../../actionMethod';

export = {
    '/': {
        post: {
            action: basicActionMethod,
            level: 'public',
        },
        get: {
            action: basicActionMethod,
            level: 'public',
        },
    },
    '/:id': {
        get: {
            action: basicActionMethod,
            level: 'public',
        },
    },
};
