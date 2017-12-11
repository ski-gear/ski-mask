import { Either } from "fp-ts/lib/Either";
import { identity } from "fp-ts/lib/function";
import { PathLike } from "fs";

import { readFile } from "./file";
import { parseJson } from "./json";
import { IgluResolverSchema, JsonMessage } from "./types/Types";

export const readResolverConfigFromFile = (resolverFile: PathLike): Either<JsonMessage, IgluResolverSchema> => {
  return readFile(resolverFile).chain(readResolverConfig);
};

export const readResolverConfig = (resolverConfigString: string): Either<JsonMessage, IgluResolverSchema> => {
  return parseJson(resolverConfigString).map((json) => json as IgluResolverSchema);
};
