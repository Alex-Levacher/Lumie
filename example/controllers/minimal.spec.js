const test = require('ava');
const request = require('supertest');
const app = require('../app');

test('[GET] /api/minimal should pass', async (t) => {
    const { body, status } = await request(app)
    .get('/api/minimal')
    .set('Accept', 'application/json');

    t.is(body.msg, 'I am a minimal implementation');
    t.is(status, 200);
});

test('[GET] /api/minimal/number/12 should pass', async (t) => {
    const { body, status } = await request(app)
    .get('/api/minimal/number/12')
    .set('Accept', 'application/json');

    t.is(body.msg, 'The number is 12');
    t.is(status, 200);
});

test('[GET] /api/minimal/tiny should pass', async (t) => {
    const { body, status } = await request(app)
    .get('/api/minimal/tiny')
    .set('Accept', 'application/json');

    t.is(body.msg, 'You can\'t do easier');
    t.is(status, 200);
});
