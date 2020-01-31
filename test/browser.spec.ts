import test from 'ava';
import { browseControllerDirectory, LumieConfig, browseRoutingFiles } from '../src/lumie';
import { expectedMockRoutingFiles, expectedRoutingDefinitions } from './mock/expectedBrowsingResults';

const directoryPath = 'test/mock/controllers';

test('browsing the mock directory should return right RoutingFile array', t => {
    const config = { routingFiles: '*.routing' } as LumieConfig;

    const routingFiles = browseControllerDirectory(directoryPath, '/', config);
    t.deepEqual(routingFiles, expectedMockRoutingFiles);
});

test('browsing the routing files should return the right routing definitions', t => {
    const routingDefinitions = browseRoutingFiles(expectedMockRoutingFiles);
    t.deepEqual(routingDefinitions, expectedRoutingDefinitions);
});
