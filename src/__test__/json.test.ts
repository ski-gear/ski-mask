import { IgluJsonPayload, IgluSchema, JsonMessage, AnyJson } from '../types/Types';
import { expect } from 'chai';
import 'mocha';
import * as path from 'path';
import * as fs from 'fs';
import { validateSchema, parseJson } from '../json'
import { path as rPath } from "ramda";
import { Either } from 'fp-ts/lib/Either';
import { TaskEither } from 'fp-ts/lib/TaskEither';

const getJsonFromFile = (fileName: string): AnyJson => {
	const file = path.join(__dirname, 'fixtures', 'json-schema', fileName);
	return JSON.parse(fs.readFileSync(file).toString());
}

describe('Json', () => {
	describe('parseJson', () => {
		let action: Either<JsonMessage, AnyJson>;

		describe('with valid JSON', () => {
			it('returns a right value', () => {
				action = parseJson('{"a": 1}');
				expect(action.isRight()).to.be.true;
				action.map(
					(r) => expect(r).to.eql({a: 1})
				);
			});
		});

		describe('with invalid JSON', () => {
			before(() => {
				action = parseJson('{"a": 1');
			});

			it('returns a left value', () => {
				expect(action.isLeft()).to.be.true;
			});

			it('returns the correct error message', () => {
				action.mapLeft(
					(e: JsonMessage) => {
						expect(e.message).to.match(/JSON parse error/);
						expect(e.context).to.match(/Could not parse/);
					}
				);
			});
		});
	});

	describe('validateSchema', () => {
		let action: Either<JsonMessage, AnyJson>;

		describe('with conformant JSON', () => {

			before(() => {
				action = validateSchema(
					getJsonFromFile('simple.good.json'),
					getJsonFromFile('simple.schema.json') as IgluSchema
				);
			});

			it('returns a right value', () => {
				expect(action.isRight()).to.be.true;
			});
		});

		describe('with inconformant JSON', () => {
			before(() => {
				action = validateSchema(
					getJsonFromFile('simple.bad.json'),
					getJsonFromFile('simple.schema.json') as IgluSchema
				);
			});

			it('returns an error in left', () => {
				expect(action.isLeft()).to.be.true;
			});

			it('returns the correct error message and context', () => {
				action.mapLeft(
					(e: JsonMessage) => {
						expect(e.message).to.match(/JSON schema validation failed/);
						expect(e.context).to.match(/should be equal to one of the allowed values/);
					}
				);
			});
		});
	});
});
