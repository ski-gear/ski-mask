import { expect } from 'chai';
import 'mocha';

import * as CliTest from "command-line-test";
import { prop, path as rPath } from "ramda";
import * as path from 'path';
import { JsonMessage, AnyJson } from '../../types/Types';

interface CliResponse {
	error: null | string;
	stdout: null | string;
	stderr: null | string;
};

// describe('Command Line', () => {
// 	describe('main', () => {
// 		describe('with valid input', () => {
// 			it('returns a stdout message', () => {
// 				const cliTest = new CliTest();
// 				const dataFile = './src/__test__/fixtures/payload.json';
// 				const resolverFile = './src/__test__/fixtures/resolver.json';
// 				return cliTest.exec(`./dist/commandLine.js -r ${resolverFile} -d ${dataFile}`).then(
// 					(res: CliResponse) => {
// 						expect(res.stdout).to.match(/All Valid/);
// 					}
// 				);
// 			});
// 		});

// 		describe('with invalid inputs', () => {
// 			it('returns a stderr message', () => {
// 				const cliTest = new CliTest();
// 				const resolverFile = './src/__test__/fixtures/resolver.json';
// 				return cliTest.exec(`./dist/commandLine.js -r ${resolverFile}`).then(
// 					(res: CliResponse) => {
// 						expect(res.error).to.match(/Cannot continue without Data File/);
// 					}
// 				);
// 			});
// 		});

// 		describe('with a bad payload file', () => {
// 			it('returns a stderr message', () => {
// 				const cliTest = new CliTest();
// 				const dataFile = './src/__test__/fixtures/payload.bad.json';
// 				const resolverFile = './src/__test__/fixtures/resolver.json';
// 				return cliTest.exec(`./dist/commandLine.js -r ${resolverFile} -d ${dataFile}`).then(
// 					(res: CliResponse) => {
// 						expect(res.error).to.match(/JSON schema validation failed/);
// 					}
// 				);
// 			});
// 		});
// 	});
// });
