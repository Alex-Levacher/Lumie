const test = require('ava');
const request = require('supertest');
const app = require('../app');

test('[GET] /api/minimal should pass', async (t) => {
    const { body, status } = await request(app)
    .get('/api/minimal')
    .set('Accept', 'application/json');

    t.is(status, 200);
    t.is(body.msg, 'I am a minimal implementation');
});

test('[GET] /api/minimal/number/12 should return 401', async (t) => {
    const { body, status } = await request(app)
    .get('/api/minimal/number/12')
    .set('Accept', 'application/json');

    t.is(status, 401);
    t.falsy(body.msg);
});
