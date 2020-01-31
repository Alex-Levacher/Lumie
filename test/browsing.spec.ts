import test from 'ava';
import { Request, Response } from 'express';
import { browseControllerDirectory, LumieConfig, browseRoutingFiles } from '../src/lumie';

export const actionMethod = (req: Request, res: Response) => res.json();

const mockRoutingFiles = [
    {
        filenameWithoutExtention: 'users.routing',
        ressource: '/admin/users',
        sourcePath: 'test/mockDirectory/admin/users/users.routing.ts',
    },
    {
        filenameWithoutExtention: 'index.routing',
        ressource: '/index',
        sourcePath: 'test/mockDirectory/index/index.routing.ts',
    },
    {
        filenameWithoutExtention: 'users.routing',
        ressource: '/users',
        sourcePath: 'test/mockDirectory/users/users.routing.ts',
    },
];

test('browsing the mock directory should return right RoutingFile array', t => {
    const config = { routingFiles: '*.routing' } as LumieConfig;

    const routingFiles = browseControllerDirectory('test/mockDirectory', '/', config);
    t.deepEqual(routingFiles, mockRoutingFiles);
});

test('browsing the routing files should return the right routing definitions', t => {
    const routingDefinitions = browseRoutingFiles(mockRoutingFiles);
    const action = actionMethod;
    t.deepEqual(routingDefinitions, [
        {
            parameter: '/',
            verb: 'get',
            ressource: '/admin/users',
            filenameWithoutExtention: 'users.routing',
            level: 'public',
            action,
            middlewares: undefined,
        },
        {
            parameter: '/',
            verb: 'get',
            ressource: '',
            filenameWithoutExtention: 'index.routing',
            level: 'public',
            action,
            middlewares: undefined,
        },
        {
            parameter: '/:project(apple|banana)',
            verb: 'get',
            ressource: '',
            filenameWithoutExtention: 'index.routing',
            level: 'public',
            action,
            middlewares: undefined,
        },
        {
            parameter: '/',
            verb: 'post',
            ressource: '/users',
            filenameWithoutExtention: 'users.routing',
            level: 'public',
            action,
            middlewares: undefined,
        },
        {
            parameter: '/',
            verb: 'get',
            ressource: '/users',
            filenameWithoutExtention: 'users.routing',
            level: 'public',
            action,
            middlewares: undefined,
        },
        {
            parameter: '/:id',
            verb: 'get',
            ressource: '/users',
            filenameWithoutExtention: 'users.routing',
            level: 'public',
            action,
            middlewares: undefined,
        },
    ]);
});
