import { AnyJson } from "src/json";

export interface JsonMessage {
	success: boolean;
  message: string;
  context?: string;
}

export type IgluSchema = AnyJson & {
	$schema: string;
	description: string;
	self: {
		vendor: string;
		name: string;
		format: string;
		version: string;
	}
};

export type IgluJsonPayload = AnyJson & {
	schema: string;
	data: PayloadData;
}

export type PayloadData = {
	schema: string;
	data: {
		schema: string,
		data: {
			[key: string]: any,
		}
	};
}

export type IgluResolverSchema = IgluJsonPayload & {
	schema: string;
	data: SchemaData;
}

export interface Http {
	uri: string;
}

export interface Connection {
	http: Http;
}

export interface Repository {
	name: string;
	priority: number;
	vendorPrefixes: string[];
	connection: Connection;
}

export interface SchemaData {
	cacheSize: number;
	repositories: Repository[];
}

export interface SchemaAddress {
	protocol: string;
	vendor: string;
	event: string;
	format: string;
	version: string;
}
