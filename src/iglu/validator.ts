import { IgluJsonPayload, IgluResolverSchema, IgluSchema, PayloadData, JsonMessage } from '../types/Types';
import { validateSchema, AnyJson } from '../json';
import { TaskEither, fromEither } from 'fp-ts/lib/TaskEither';
import { Either, right } from 'fp-ts/lib/Either';
import { curry, dissoc } from "ramda";

const metaSchemaFile = require('./schemas/self-describing/schema/1-0-0.json');
const resolverSchemaFile = require('./schemas/resolver/1-0-0.json');
const payloadSchemaFile = require('./schemas/self-describing/instance/1-0-0.json');

export const metaSchemaCheck = (json: AnyJson): Either<JsonMessage, IgluSchema> => {
	return conformsToSchema(metaSchemaFile, json) as Either<JsonMessage, IgluSchema>;
};

export const resolverConfigSchemaCheck = (json: AnyJson): Either<JsonMessage, IgluResolverSchema> => {
	const topLevelSchemaCheck = conformsToSchema(payloadSchemaFile, json);

	return topLevelSchemaCheck.chain(
			(json: IgluJsonPayload) => conformsToSchema(resolverSchemaFile, json.data)
		).chain(
			(_) => right(json as IgluResolverSchema)
		)
};

export const payloadSchemaCheck = (json: AnyJson): Either<JsonMessage, PayloadData> => {
	const topLevelSchemaCheck = conformsToSchema(payloadSchemaFile, json);

	return topLevelSchemaCheck.chain(
			(json: IgluJsonPayload) => conformsToSchema(payloadSchemaFile, json.data)
		).chain(
			(_) => right(json as PayloadData)
		)
	};

	const conformsToSchema = (schema: IgluSchema, json: AnyJson): Either<JsonMessage, AnyJson> => {
		const cleanedSchema = cleanIgluSchema(schema);
		return validateSchema(json, cleanedSchema);
	};

	const cleanIgluSchema = (schema: IgluSchema): IgluSchema => {
		return dissoc("$schema", schema);
};
