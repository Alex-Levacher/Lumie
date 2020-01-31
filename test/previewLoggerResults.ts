import { logRoutingDefinitions, LumieConfig } from '../src/lumie';
import { expectedRoutingDefinitions } from './mock/expectedBrowsingResults';

// ts-node test/previewLoggerResults.ts
logRoutingDefinitions(expectedRoutingDefinitions, { logger: console.log as Function } as LumieConfig);
