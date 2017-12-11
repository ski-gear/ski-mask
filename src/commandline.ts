#!/usr/bin/env node

import * as commander from "commander";

import { liftA2 } from "fp-ts/lib/Apply";
import { Either, either, left, right } from "fp-ts/lib/Either";
import { compose, curry } from "fp-ts/lib/function";
import { fromEither, taskEither } from "fp-ts/lib/TaskEither";
import * as jsome from "jsome";
import { isEmpty, isNil, or } from "ramda";
import { JsonMessage } from "src/types/Types";
import { readFile } from "./file";
import { validate } from "./index";
import { parseJson } from "./json";

const main = (): void => {
	const version = require("../package.json").version;
	commander
	  .version(version)
		.option("-d, --data-file [file]", "Path of the Data file")
		.option("-r, --resolver-file [file]", "Path of the Resolver Config File")
		.parse(process.argv);

	const data = checkOption("Data File", commander.dataFile).chain(readFile).chain(parseJson);
	const resolver = checkOption("Resolver Config File", commander.resolverFile).chain(readFile).chain(parseJson);

	const runner = liftA2(either)(curry(validate));
	runner(data)(resolver).fold(
		(e) => {
			console.error(jsome.getColoredString(e));
			process.exit(1);
		},
		(d) => {
			d.then(
				(s) => {
					console.log(jsome.getColoredString(s));
					process.exit(0);
				},
			).catch(
				(e) => {
					console.error(jsome.getColoredString(e));
					process.exit(1);
				},
			);
		},
	);
};

const checkOption = (name: string, opt: string): Either<JsonMessage, string> => {
	const error = {
		success: false,
		message: `Cannot continue without ${name}`,
	};
	return or(isEmpty(opt), isNil(opt)) ? left(error) : right(opt);
};

main();
