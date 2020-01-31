import { basicActionMethod } from './actionMethod';
import { RoutingDefinition, RoutingFile } from '../../src/lumie';

export const expectedMockRoutingFiles: RoutingFile[] = [
    {
        filenameWithoutExtention: 'users.routing',
        ressource: '/admin/users',
        sourcePath: 'test/mock/controllers/admin/users/users.routing.ts',
    },
    {
        filenameWithoutExtention: 'index.routing',
        ressource: '/index',
        sourcePath: 'test/mock/controllers/index/index.routing.ts',
    },
    {
        filenameWithoutExtention: 'users.routing',
        ressource: '/users',
        sourcePath: 'test/mock/controllers/users/users.routing.ts',
    },
];

export const expectedRoutingDefinitions: RoutingDefinition[] = [
    {
        parameter: '/',
        verb: 'get',
        ressource: '/admin/users',
        filenameWithoutExtention: 'users.routing',
        level: 'public',
        action: basicActionMethod,
        middlewares: undefined,
    },
    {
        parameter: '/',
        verb: 'get',
        ressource: '',
        filenameWithoutExtention: 'index.routing',
        level: 'public',
        action: basicActionMethod,
        middlewares: undefined,
    },
    {
        parameter: '/:project(apple|banana)',
        verb: 'get',
        ressource: '',
        filenameWithoutExtention: 'index.routing',
        level: 'public',
        action: basicActionMethod,
        middlewares: undefined,
    },
    {
        parameter: '/',
        verb: 'post',
        ressource: '/users',
        filenameWithoutExtention: 'users.routing',
        level: 'public',
        action: basicActionMethod,
        middlewares: undefined,
    },
    {
        parameter: '/',
        verb: 'get',
        ressource: '/users',
        filenameWithoutExtention: 'users.routing',
        level: 'public',
        action: basicActionMethod,
        middlewares: undefined,
    },
    {
        parameter: '/:id',
        verb: 'get',
        ressource: '/users',
        filenameWithoutExtention: 'users.routing',
        level: 'public',
        action: basicActionMethod,
        middlewares: undefined,
    },
];
