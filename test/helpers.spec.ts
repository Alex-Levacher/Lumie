import test from 'ava';
import { normalizePathForWindows, getFullEnpoint } from '../src/lumie';

test('normalizePathForWindows should works with windows paths', t => {
    const value = normalizePathForWindows('\\test\\foo');
    t.is(value, '/test/foo');
});

test('normalizePathForWindows should works with basic paths', t => {
    const value = normalizePathForWindows('/test/foo');
    t.is(value, '/test/foo');
});

test('getFullEnpoint should pass with all parameters', t => {
    const endpoint = getFullEnpoint({
        context: 'api',
        version: 'v2',
        ressource: 'user',
        parameter: ':id',
    });
    t.is(endpoint, '/api/v2/user/:id');
});

test('getFullEnpoint should pass without context', t => {
    const endpoint = getFullEnpoint({
        version: 'v2',
        ressource: 'user',
        parameter: ':id',
    });
    t.is(endpoint, '/v2/user/:id');
});

test('getFullEnpoint should pass without version', t => {
    const endpoint = getFullEnpoint({
        context: 'api',
        ressource: 'user',
        parameter: ':id',
    });
    t.is(endpoint, '/api/user/:id');
});
