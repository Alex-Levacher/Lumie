import { actionMethod } from '../../browsing.spec';

export = {
    '/': {
        post: {
            action: actionMethod,
            level: 'public',
        },
        get: {
            action: actionMethod,
            level: 'public',
        },
    },
    '/:id': {
        get: {
            action: actionMethod,
            level: 'public',
        },
    },
};
