import { liftA2 } from "fp-ts/lib/Apply";
import { Either, either, left, right } from "fp-ts/lib/Either";
import { compose, curry } from "fp-ts/lib/function";
import { fromEither, TaskEither, tryCatch } from "fp-ts/lib/TaskEither";
import { contains, find, pathOr } from "ramda";
import * as request from "request-promise-native";
import * as url from "url";

import { parseJson } from "../json";
import { IgluJsonPayload, IgluResolverSchema, IgluSchema, JsonMessage, Repository, SchemaAddress, SchemaData } from "../types/Types";

type SchemaUrl = string;
type RepoUrl = string;

export const fetchSchema = (igluSchemaUrl: string, resolverConfig: IgluResolverSchema): TaskEither<JsonMessage, IgluSchema> => {
	const schemaAddress = readSchemaAddress(igluSchemaUrl);
	const endPoint = schemaAddress.chain(curry(extractEndpoint)(resolverConfig));
	const schemaUrl = liftA2(either)(assembleSchemaUrl)(schemaAddress)(endPoint);
	return fromEither(schemaUrl)
		.chain(fetch)
		.chain(parsedAndValidatedJsonFromFetched);
};

const parsedAndValidatedJsonFromFetched = (fetched: string): TaskEither<JsonMessage, IgluSchema> => {
	const parsed = parseJson(fetched).map((a) => a as IgluSchema);
	return fromEither(parsed);
};

const assembleSchemaUrl = curry((schemaAddress: SchemaAddress, endPoint: string): SchemaUrl => {
	const path = `schemas/${schemaAddress.vendor}/${schemaAddress.event}/${schemaAddress.format}/${schemaAddress.version}`;
	return url.resolve(endPoint, path);
});

const readSchemaAddress = (address: string): Either<JsonMessage, SchemaAddress> => {
	const pattern = /(^.*?):(.*?)\/(.*?)\/(.*?)\/(\d-\d-\d)$/;
	const matches = address.match(pattern);
	if (matches) {
		const schemaAddress: SchemaAddress = {
			protocol: matches[1],
			vendor: matches[2],
			event: matches[3],
			format: matches[4],
			version: matches[5],
		};
		return right(schemaAddress);
	} else {
		return left(
			{
				success: false,
				message: "Iglu Schema regex match failed for address",
				context: JSON.stringify(address),
			},
		);
	}
};

const extractEndpoint = (resolverConfig: IgluResolverSchema, schemaAddress: SchemaAddress): Either<JsonMessage, RepoUrl> => {
	const data = resolverConfig.data as SchemaData;
	const repo = find(
		(r: Repository): boolean => {
			return contains(schemaAddress.vendor, pathOr("", ["vendorPrefixes"], r));
		},
		pathOr([], ["repositories"], data),
	);

	if (repo) {
		return right(repo.connection.http.uri);
	} else {
		return left(
			{
				success: false,
				message: "Could not find a valid Repository for address.",
				context: JSON.stringify(schemaAddress),
			},
		);
	}
};

const fetch = (urlString: string): TaskEither<JsonMessage, string> => {
	return tryCatch(
		() => request.get(urlString, {resolveWithFullResponse: true}).then((res) => res.body),
		(err) => {
			return {
				success: false,
				message: `Could not fetch from URL: ${urlString}`,
				context: JSON.stringify(err),
			};
		},
	);
};
