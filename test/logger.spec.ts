import test from 'ava';
import { assert, spy } from 'sinon';
import { logRoutingDefinitions, LumieConfig } from '../src/lumie';
import { basicActionMethod } from './mock/actionMethod';

test('Logging simple routingDefinitions should pass', t => {
    const config = { logger: spy() } as LumieConfig;
    const routingDefinition = [
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
            ressource: '/cars',
            filenameWithoutExtention: 'index.routing',
            level: 'public',
            action: basicActionMethod,
            middlewares: undefined,
        },
    ];

    logRoutingDefinitions(routingDefinition, config);
    assert.callCount(config.logger, 6);
    assert.calledWith(config.logger, '=== LUMIE ROUTING ===');
    assert.calledWith(config.logger, '\n================');
    assert.calledWith(config.logger, '\n Users ');
    assert.calledWith(config.logger, '\n Cars ');
    assert.calledWith(config.logger, '   GET\t[public]\t/users/');
    assert.calledWith(config.logger, '   GET\t[public]\t/cars/:id');
    t.pass();
});
