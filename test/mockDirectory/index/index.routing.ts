import { actionMethod } from '../../browsing.spec';

export = {
    rewriteRessource: '',
    '/': {
        get: {
            action: actionMethod,
            level: 'public',
        },
    },
    '/:project(apple|banana)': {
        get: {
            action: actionMethod,
            level: 'public',
        },
    },
};
