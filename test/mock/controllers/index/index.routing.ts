import { basicActionMethod } from '../../actionMethod';

export = {
    rewriteRessource: '',
    '/': {
        get: {
            action: basicActionMethod,
            level: 'public',
        },
    },
    '/:project(apple|banana)': {
        get: {
            action: basicActionMethod,
            level: 'public',
        },
    },
};
