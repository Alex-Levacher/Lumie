import test from 'ava';
import { assert, spy } from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { loadRoute, RoutingDefinition, LumieConfig } from '../src/lumie';

test('load the simplest route should pass', t => {
    const app: any = { get: spy() };
    const config = {} as LumieConfig;
    const route: RoutingDefinition = {
        verb: 'get',
        ressource: 'users',
        filenameWithoutExtention: 'users.routing',
        parameter: '',
        action: () => true,
    };

    loadRoute(app, route, config);

    assert.calledOnce(app.get);
    assert.calledWith(app.get, '/users', [], route.action);
    t.pass();
});

test('load route with middlewares should pass', t => {
    const app: any = { get: spy() };
    const simpleMiddleware = (req: Request, res: Response, next: NextFunction) => next();
    const config = { } as LumieConfig;
    const route: RoutingDefinition = {
        verb: 'get',
        ressource: 'users',
        filenameWithoutExtention: 'users.routing',
        parameter: '',
        middlewares: [simpleMiddleware],
        action: () => true,
    };

    loadRoute(app, route, config);

    assert.calledOnce(app.get);
    assert.calledWith(app.get, '/users', [simpleMiddleware], route.action);
    t.pass();
});


test('load route with a permission handler should pass', t => {
    const app: any = { get: spy() };
    const simpleMiddleware = (req: Request, res: Response, next: NextFunction) => next();
    const permissionsHandler = (level: string) => simpleMiddleware;
    const config = { permissionsHandler } as LumieConfig;
    const route: RoutingDefinition = {
        verb: 'get',
        ressource: 'users',
        filenameWithoutExtention: 'users.routing',
        parameter: '',
        middlewares: [simpleMiddleware],
        level: 'public',
        action: () => true,
    };

    loadRoute(app, route, config);

    assert.calledOnce(app.get);
    assert.calledWith(app.get, '/users', [simpleMiddleware, simpleMiddleware], route.action);
    t.pass();
});
