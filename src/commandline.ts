#!/usr/bin/env node

import * as commander from 'commander';

import { parseJson } from './json';
import { validate } from './index';
import { readFile } from './file';
import { liftA2 } from 'fp-ts/lib/Apply';
import { taskEither, fromEither } from 'fp-ts/lib/TaskEither';
import { Either, either, left, right } from 'fp-ts/lib/Either';
import { curry, compose } from 'fp-ts/lib/function';
import * as jsome from 'jsome';
import { JsonMessage } from 'src/types/Types';
import { isEmpty, isNil, or } from "ramda";

const main = (): void => {
	const version = require('../package.json').version
	commander
	  .version(version)
		.option("-d, --data-file [file]", "Path of the Data file")
		.option("-r, --resolver-file [file]", "Path of the Resolver Config File")
		.parse(process.argv);

	const data = checkOption('Data File', commander.dataFile).chain(readFile).chain(parseJson);
	const resolver = checkOption('Resolver Config File', commander.resolverFile).chain(readFile).chain(parseJson);

	const runner = liftA2(either)(curry(validate))
	runner(data)(resolver).fold(
		(e) => {
			console.error(jsome.getColoredString(e));
			process.exit(1)
		},
		(d) => {
			d.then(
				(s) => {
					console.log(jsome.getColoredString(s));
					process.exit(0);
				}
			).catch(
				(e) => {
					console.error(jsome.getColoredString(e));
					process.exit(1);
				}
			)
		}
	)
};

const checkOption = (name: string, opt: string): Either<JsonMessage, string> => {
	const error = {
		success: false,
		message: `Cannot continue without ${name}`
	}
	return or(isEmpty(opt), isNil(opt)) ? left(error) : right(opt)
}

main();
