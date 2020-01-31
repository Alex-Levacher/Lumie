import { actionMethod } from '../../../browsing.spec';

export = {
    '/': {
        get: {
            action: actionMethod,
            level: 'public',
        },
    },
};
