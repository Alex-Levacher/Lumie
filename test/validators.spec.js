const test = require('ava');
const validators = require('../src/validators');

test('ctrlsPath should fail without path', (t) => {
    const error = t.throws(() => {
        validators.ctrlsPath();
    }, Error);

    t.is(error.message, 'Expected a controllers path in options to be a string');
});

test('ctrlsPath should fail with an incorrect path', (t) => {
    const error = t.throws(() => {
        validators.ctrlsPath('./fake');
    }, Error);

    t.is(error.message, 'The controller path is incorrect');
});

test('ctrlsPath should pass', (t) => {
    validators.ctrlsPath('./src', {});
    t.pass();
});

test('verbose should fail with incorrect value', (t) => {
    const error = t.throws(() => {
        validators.verbose(() => false, {});
    }, Error);

    t.is(error.message, 'Expected verbose to be a boolean');
});

test('verbose should pass', (t) => {
    validators.verbose(true, {});
    t.pass();
});

test('ignore should fail with incorrect value', (t) => {
    const error = t.throws(() => {
        validators.ignore('heyYo', {});
    }, Error);

    t.is(error.message, 'Expected ignore to be an Array');
});

test('ignore should pass', (t) => {
    validators.ignore([], {});
    t.pass();
});

test('preURL should fail with incorrect value', (t) => {
    const error = t.throws(() => {
        validators.preURL([], {});
    }, Error);

    t.is(error.message, 'Expected preURL to be a string');
});

test('preURL should pass', (t) => {
    validators.preURL('v2', {});
    t.pass();
});

test('permissions should fail with incorrect value', (t) => {
    const error = t.throws(() => {
        validators.permissions([], {});
    }, Error);

    t.is(error.message, 'Expected permissions to be a function');
});

test('permissions should pass', (t) => {
    validators.permissions(() => true, {});
    t.pass();
});
