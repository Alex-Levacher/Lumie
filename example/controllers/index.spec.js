const test = require('ava');
const request = require('supertest');
const app = require('../app');

test('[GET] / pass', async (t) => {
    const { body, status } = await request(app)
    .get('/api/')
    .set('Accept', 'application/json');

    t.is(status, 200);
    t.is(body.msg, 'I am an example of route with the path option');
});
