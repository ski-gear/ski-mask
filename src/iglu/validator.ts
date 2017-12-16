import { liftA2 } from "fp-ts/lib/Apply";
import { array } from "fp-ts/lib/Array";
import { flatten } from "fp-ts/lib/Chain";
import { Either, either, right, left} from "fp-ts/lib/Either";
import { curry } from "fp-ts/lib/function";
import { assocPath } from 'ramda';
import {
  fromEither,
  of as teOf,
  TaskEither,
  taskEither,
} from "fp-ts/lib/TaskEither";
import { sequence } from "fp-ts/lib/Traversable";
import { append, dissoc, map, mapObjIndexed, prop, reduce, type } from "ramda";
import { validateSchema } from "../json";
import { readResolverConfig } from "../resolver";
import {
  AnyJson,
  IgluJsonPayload,
  IgluResolverSchema,
  IgluSchema,
  JsonMessage,
} from "../types/Types";
import { fetchSchema } from "./fetcher";

const metaSchemaFile = require("./schemas/self-describing/schema/1-0-0.json");
const metaResolverConfig = require("./metaIgluResolver.json");
const payloadSchemaFile = require("./schemas/self-describing/instance/1-0-0.json");

export const validateIgluResolverSchema = (
  json: AnyJson,
): TaskEither<JsonMessage, IgluResolverSchema> => {
  const igluJson = json as IgluResolverSchema;
  return validateIgluData(json, metaResolverConfig).map(_ => igluJson);
};

export const validateIgluData = (
  json: AnyJson,
  resolverConfig: IgluResolverSchema,
): TaskEither<JsonMessage, string> => {
  const checkableSchemas = reduceToListOfSchemas([], json);
  const checks = map(ijp => {
    const igluJsonPayloadTask = fromEither(ijp)
    const schemaTask = igluJsonPayloadTask.map(j => j.schema).chain(curry(fetchSchema)(resolverConfig));
    const dataTask = igluJsonPayloadTask.map(j => j.data)
    return liftA2(taskEither)(curry(validateSchema))(dataTask)(schemaTask);
  }, checkableSchemas);

  const sequencedChecks = sequence(taskEither, array)(checks)
    .map(a => sequence(either, array)(a))
    .map(fromEither);

  return flatten(taskEither)(sequencedChecks).map((_) => "✓ Valid Payload");
};

const conformsToSchema = (
  schema: IgluSchema,
  json: AnyJson,
): Either<JsonMessage, AnyJson> => {
  return validateSchema(json, schema);
};

interface JsonWithSchema {
  schema: string;
  data?: AnyJson;
}

export const reduceToListOfSchemas = (
  acc: Either<JsonMessage, IgluJsonPayload>[],
  json: AnyJson,
): Either<JsonMessage, IgluJsonPayload>[] => {
  switch (type(json)) {
    case "Array":
      map(elem => reduceToListOfSchemas(acc, elem), json as AnyJson[]); // recurse
      break;
    case "Object":
      mapObjIndexed((v, k) => {
        if (k === "schema") {
          const check = validateSchema(json, payloadSchemaFile);
          const data: AnyJson = prop("data", json as any);
          if (check.isRight()) {
            acc.push(right(json as IgluJsonPayload)); // mutation :(
            reduceToListOfSchemas(acc, data); // recurse
          } else {
            acc.push(left(check.value))
          }
        }
      }, json);
      break;
    default:
      break;
  }
  return acc;
};
