import { readResolverConfig } from '../resolver';
import { IgluJsonPayload, IgluResolverSchema, IgluSchema, JsonMessage, AnyJson } from '../types/Types';
import { validateSchema } from '../json';
import { TaskEither, fromEither, taskEither, of as teOf } from 'fp-ts/lib/TaskEither';
import { Either, right, either } from 'fp-ts/lib/Either';
import { dissoc, mapObjIndexed, map, reduce, type, prop, append } from "ramda";
import { fetchSchema } from './fetcher';
import { liftA2 } from 'fp-ts/lib/Apply';
import { sequence } from 'fp-ts/lib/Traversable';
import { curry } from 'fp-ts/lib/function'
import { array } from 'fp-ts/lib/Array'
import { flatten } from 'fp-ts/lib/Chain';

const metaSchemaFile = require('./schemas/self-describing/schema/1-0-0.json');
const metaResolverConfig = require('./metaIgluResolver.json');
const payloadSchemaFile = require('./schemas/self-describing/instance/1-0-0.json');

export const metaSchemaCheck = (json: AnyJson): Either<JsonMessage, IgluSchema> => {
	return conformsToSchema(metaSchemaFile, json).map(a => a as IgluSchema) as Either<JsonMessage, IgluSchema>;
};

export const validateIgluResolverSchema = (json: AnyJson): TaskEither<JsonMessage, IgluResolverSchema> => {
	const igluJson = json as IgluResolverSchema;
	return validateIgluData(json, metaResolverConfig).map(_ => igluJson)
};

export const validateIgluData = (json: AnyJson, resolverConfig: IgluResolverSchema): TaskEither<JsonMessage, string> => {
	const checkableSchemas = reduceToListOfSchemas([], json);

	const checks = map(
		(j) => {
			const schemaTask = fetchSchema(j.schema, resolverConfig)
			const dataTask = teOf(j.data).mapLeft(_ => dummyJsonMessage)
			return liftA2(taskEither)(curry(validateSchema))(dataTask)(schemaTask)
		},
		checkableSchemas
	)
	
	const sequencedChecks = sequence(taskEither, array)(checks).map(
		(a) => sequence(either, array)(a)
	).map(fromEither);

	return flatten(taskEither)(sequencedChecks).map(_ => '✓ Valid Payload')
}


const dummyJsonMessage: JsonMessage = {
	success: false,
	message: 'Dummy'
}

const conformsToSchema = (schema: IgluSchema, json: AnyJson): Either<JsonMessage, AnyJson> => {
	// const cleanedSchema = cleanIgluSchema(schema);
	return validateSchema(json, schema);
};

type JsonWithSchema = {
	schema: string,
	data?: AnyJson
}

export const reduceToListOfSchemas = (acc: AnyJson[], json: AnyJson ): IgluJsonPayload[] => {
	switch (type(json)) {
		case 'Array':
				map(elem => reduceToListOfSchemas(acc, elem), json as AnyJson[]); // recurse
			break;
		case 'Object':
			mapObjIndexed(
				(v, k) => {
					if (k === 'schema') {
						const check = validateSchema(json, payloadSchemaFile);
						const data: AnyJson = prop('data', json as any);
						if (check.isRight()) {
							acc.push(json) // mutation :(
							reduceToListOfSchemas(acc, data); // recurse
						}
					}
				},
				json
			);
			break;
		default:
			break;
	}
	return acc as IgluJsonPayload[];
};
