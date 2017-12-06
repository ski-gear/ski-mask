import { readFile} from '../file';
import { expect } from 'chai';
import 'mocha';
import * as path from 'path';
import * as fs from 'fs';
import { path as rPath } from "ramda";


describe('File', () => {
	describe('readFile', () => {
		describe('with a good file', () => {
			it('reads and returns the contents', () => {
				const file = path.join(__dirname, 'fixtures', 'file.a.txt');
				const result = readFile(file);
				expect(result.isRight()).to.be.true;
				result.map(
					(data) => {
						expect(data).to.match(/This is some awesome/);
					}
				)
			});
		})

		describe('with a non-existent file', () => {
			it('returns an appropriate error in left', () => {
				const file = path.join(__dirname, 'fixtures', 'file.blah.txt');
				const result = readFile(file);
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
});
