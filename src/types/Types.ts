export type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
interface JsonArray extends Array<AnyJson> {}

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
  };
};

export type IgluJsonPayload = AnyJson & {
  schema: string;
  data: AnyJson;
};

export type IgluResolverSchema = IgluJsonPayload & {
  schema: string;
  data: SchemaData;
};

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
