import { readResolverConfigFromFile, readResolverConfig } from '../resolver';
import { expect } from 'chai';
import 'mocha';
import * as path from 'path';
import { IgluResolverSchema } from '../types/Types';
import * as fs from 'fs';
import { path as rPath } from "ramda";


describe('Resolver', () => {
	describe('readResolverConfigFromFile', () => {
		describe('with a good file', () => {
			it('reads and returns the JSON', () => {
				const resolverFile = path.join(__dirname, 'fixtures', 'resolver.json');
				const result = readResolverConfigFromFile(resolverFile);
				expect(result.isRight()).to.be.true;
				result.map(
					(data) => {
						expect(data.schema).to.eq('iglu:com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0');
					}
				)
			});
		})

		describe('with a non-existent file', () => {
			it('returns an appropriate error in left', () => {
				const resolverFile = path.join(__dirname, 'fixtures', 'resolver.blah.json');
				const result = readResolverConfigFromFile(resolverFile);
				expect(result.isLeft()).to.be.true;
				result.mapLeft(
					(err) => {
						expect(rPath(['message'], err)).to.match(/Failed to read file/);
						expect(rPath(['context'], err)).to.match(/no such file or directory/);
					}
				)
			});
		});
	});

	describe('readResolverConfig', () => {
		describe('with a valid JSON', () => {
			it('returns the resolver config', () => {
				const resolverFile = path.join(__dirname, 'fixtures', 'resolver.json');
				const contents = fs.readFileSync(resolverFile).toString();
				const data = readResolverConfig(contents);
				expect(data.isRight()).to.be.true;
				data.map(
					(d) => {
						expect(d.schema).to.eq('iglu:com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0');
					}
				)
			});
		});

		describe('with invalid JSON', () => {
			it('returns an appropriate error in left', () => {
				const result = readResolverConfig('this is so not JSON');
				expect(result.isLeft()).to.be.true;
				result.mapLeft(
					(err) => {
						expect(rPath(['message'], err)).to.match(/JSON parse error/);
						expect(rPath(['context'], err)).to.match(/Could not parse/);
					}
				)
			});
		});
	});
});
