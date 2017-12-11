import { validate } from '../index';
import { expect } from 'chai';
import * as chai from 'chai';
import * as ChaiAsPromised from 'chai-as-promised';
import 'mocha';
import * as path from 'path';
import * as fs from 'fs';
import { path as rPath, prop } from "ramda";
import { AnyJson } from '../types/Types';
import * as vcr from 'nock-vcr-recorder';
import { PathLike } from 'fs';
import {  getJsonFromFile } from "./test.helpers";

chai.use(ChaiAsPromised);

describe('Index', () => {
	describe('validate', () => {
		describe('with valid json data', () => {
			it('returns a resolved promise with a success message', () => {
				return vcr.useCassette('iglu', async () => {
					const jsonFile = getJsonFromFile(
						path.join(__dirname, 'fixtures', 'payload.json')
					);

					const resolverConfigFile = getJsonFromFile(
						path.join(__dirname, 'fixtures', 'resolver.json')
					);

					const validation = await validate(jsonFile, resolverConfigFile)
					expect(validation.success).to.be.true;
					expect(validation.message).to.match(/All Valid/);
				});
			});
		})

		describe('with invalid json data', () => {
			it('returns a rejected promise with an appropriate message', () => {
				return vcr.useCassette('iglu', () => {
					const jsonFile = getJsonFromFile(
						path.join(__dirname, 'fixtures', 'payload.bad.json')
					);

					const resolverConfigFile = getJsonFromFile(
						path.join(__dirname, 'fixtures', 'resolver.json')
					);

					const validation = validate(jsonFile, resolverConfigFile);
					return expect(validation).to.eventually.be.rejectedWith(/JSON schema validation failed/)
				});
			});
		})
	});
});
