const test = require('ava');
const request = require('supertest');
const app = require('../../app');

test('[POST] /car should pass', async (t) => {
    const { body, status } = await request(app)
    .post('/api/cars')
    .send({})
    .set('Accept', 'application/json');

    t.is(body.msg, 'Your car have been created');
    t.is(status, 200);
});

test('[GET] /car should pass', async (t) => {
    const { body, status } = await request(app)
    .get('/api/cars')
    .set('Accept', 'application/json');

    t.is(body.length, 2);
    t.is(status, 200);
});

test('[GET] /car/:id should pass', async (t) => {
    const { body, status } = await request(app)
    .get('/api/cars/lambo')
    .set('Accept', 'application/json');

    t.is(body.brand, 'lamborghini');
    t.is(body.model, 'Huracan');
    t.is(status, 200);
});
