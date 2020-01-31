import { Application, RequestHandler } from 'express';
import { isMatch } from 'micromatch';
import { flatten, compact, forOwn, invoke, groupBy, capitalize, isUndefined } from 'lodash';
import { join, resolve } from 'path';
import { readdirSync, statSync } from 'fs';
import chalk from 'chalk';

const ERR_MSG = {
    EXPECTED_APP: 'Expected an express app as first argument',
};

export const normalizePathForWindows = (path: string) => path.replace(/\\/g, '/');

export interface LumieOptions {
    verbose?: boolean;
    directoryPath?: string;
    routingFiles?: string;
    logger?: Function;
    version?: string;
    context?: string;
    permissionsHandler?: (level: string) => RequestHandler;
}

export interface LumieConfig extends LumieOptions {
    verbose: boolean;
    directoryPath: string;
    routingFiles: string;
    logger: any;
}

export interface RoutingDefinition {
    verb: string;
    ressource: string;
    parameter: string;
    level?: string;
    action: RequestHandler;
    middlewares?: RequestHandler[];
    filenameWithoutExtention: string;
}

export interface RoutingFile {
    ressource: string;
    filenameWithoutExtention: string;
    sourcePath: string;
}

export function getFullEnpoint(
    { context, version, ressource, parameter }:
    { context?: string; version?: string; ressource: string; parameter: string },
): string {
    return normalizePathForWindows(
        join('/', ...compact([context, version, ressource, parameter])),
    );
}

export function loadRoute(app: Application, route: RoutingDefinition, config: LumieConfig) {
    const endpoint = getFullEnpoint({
        context: config.context,
        version: config.version,
        ressource: route.ressource,
        parameter: route.parameter,
    });

    const permissionsHandler = config.permissionsHandler && route.level
        ? config.permissionsHandler(route.level)
        : null;
    const middlewares = compact(route.middlewares);
    const compactedMiddlewares = compact([permissionsHandler, ...middlewares]);

    return invoke(app, route.verb, endpoint, compactedMiddlewares, route.action);
}

export function browseControllerDirectory(
    directoryPath: string, ressource: string, config: LumieConfig,
): RoutingFile[] {
    return flatten(
        compact(
            readdirSync(directoryPath)
            .map(file => {
                const currentSourcePath = join(directoryPath, file);
                const updatedRessource = join(ressource, file);
                const stats = statSync(currentSourcePath);
                if (stats.isDirectory()) {
                    return browseControllerDirectory(currentSourcePath, updatedRessource, config);
                }
                const filenameWithoutExtention = file.substr(0, file.length - 3);
                const isRoutingFile = isMatch(filenameWithoutExtention, config.routingFiles);
                const routingFile: RoutingFile = {
                    filenameWithoutExtention,
                    ressource,
                    sourcePath: currentSourcePath,
                };
                return isRoutingFile ? routingFile : null;
            }),
        ),
    );
}

export function browseRoutingFiles(routingFiles: RoutingFile[]): RoutingDefinition[] {
    const routingDefinitions: RoutingDefinition[] = [];

    routingFiles.forEach(routingFile => {
        const requiredRoutingFile = require(resolve(routingFile.sourcePath));
        const { rewriteRessource } = requiredRoutingFile;

        forOwn(requiredRoutingFile, (parameterDefinition, parameter) => {
            if (parameter === 'rewriteRessource') return;

            forOwn(parameterDefinition, (verbDefinition, verb) => {
                const routingDefinition: RoutingDefinition = {
                    parameter,
                    verb,
                    ressource: isUndefined(rewriteRessource) ? routingFile.ressource : rewriteRessource,
                    filenameWithoutExtention: routingFile.filenameWithoutExtention,
                    level: verbDefinition.level,
                    action: verbDefinition.action,
                    middlewares: verbDefinition.middlewares,
                };
                routingDefinitions.push(routingDefinition);
            });
        });
    });

    return routingDefinitions;
}

export function logRoutingDefinitions(routingDefinitions: RoutingDefinition[], config: LumieConfig) {
    config.logger('=== LUMIE ROUTING ===');
    const groupedRoutingDefinitions = groupBy(routingDefinitions, 'ressource');

    const HTTPVerbsColors: any = {
        post: chalk.green,
        get: chalk.blueBright,
        put: chalk.yellow,
        delete: chalk.red,
    };

    forOwn(groupedRoutingDefinitions, (definitions, ressource) => {
        const title = ressource
        .split('/')
        .filter(item => item)
        .map(capitalize)
        .join(' > ') || definitions[0].filenameWithoutExtention;

        config.logger(`\n${chalk.bgWhiteBright.bold.black(` ${title} `)}`);
        definitions.forEach(definition => {
            const endpoint = getFullEnpoint({
                context: config.context,
                version: config.version,
                ressource: definition.ressource,
                parameter: definition.parameter,
            });
            const verbDisplay = HTTPVerbsColors[definition.verb](definition.verb.toUpperCase());
            const endpointDisplay = chalk.underline(endpoint);
            const startLineDisplay = `${chalk.bgWhiteBright.bold(' ')}`;
            config.logger(`${startLineDisplay}  ${verbDisplay}\t[${definition.level}]\t${endpointDisplay}`);
        });
    });

    config.logger('\n================');
}

export const load = (app: Application, options?: LumieOptions) => {
    if (!app) throw new Error(ERR_MSG.EXPECTED_APP);

    const defaultConfig: LumieConfig = {
        verbose: true,
        directoryPath: 'controllers',
        routingFiles: '*.routing',
        logger: console.log,
    };

    const config: LumieConfig = { ...defaultConfig, ...options };
    const routingFiles = browseControllerDirectory(config.directoryPath, '/', config);
    const routingDefinitions = browseRoutingFiles(routingFiles);

    routingDefinitions.forEach(route => loadRoute(app, route, config));

    if (config.verbose) logRoutingDefinitions(routingDefinitions, config);
};
