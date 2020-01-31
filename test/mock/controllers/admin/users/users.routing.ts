import { basicActionMethod } from '../../../actionMethod';

export = {
    '/': {
        get: {
            action: basicActionMethod,
            level: 'public',
        },
    },
};
