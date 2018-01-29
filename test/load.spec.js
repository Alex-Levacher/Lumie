const test = require('ava');
const expressCtrl = require('../src');

test('should fail without express app', (t) => {
    const error = t.throws(() => {
        expressCtrl.load();
    }, Error);

    t.is(error.message, 'Expected an express app as first argument');
});
