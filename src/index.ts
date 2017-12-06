import { payloadSchemaCheck, metaSchemaCheck, resolverConfigSchemaCheck } from './iglu/validator';
import { liftA2 } from 'fp-ts/lib/Apply';
import { flatten } from 'fp-ts/lib/Chain';
import { curry, compose } from 'fp-ts/lib/function';
import { fromEither, taskEither } from 'fp-ts/lib/TaskEither';
import { PathLike } from 'fs';
import { path } from "ramda";

import { readFile } from './file';
import { fetchSchema } from './iglu/fetcher';
import { AnyJson, parseJson, validateSchema } from './json';
import { readResolverConfigFromFile } from './resolver';
import { IgluResolverSchema, JsonMessage } from './types/Types';
import { either } from 'fp-ts/lib/Either';

export const validate = (json: AnyJson, resolverConfig: AnyJson): Promise<JsonMessage> => {
  const validatedResolverConfig = fromEither(resolverConfigSchemaCheck(resolverConfig));
  const validatedPayloadJson = fromEither(payloadSchemaCheck(json))
  const data = validatedPayloadJson.map(j => j.data.data);

  const schemaUrl = validatedPayloadJson.map(j => j.data.schema)

  const schemaTask = liftA2(taskEither)(curry(fetchSchema))(schemaUrl)(validatedResolverConfig);
  const schema = flatten(taskEither)(schemaTask);

  const validationTask = liftA2(taskEither)(curry(validateSchema))(data)(schema).map(fromEither)

  return new Promise((resolve, reject) => {
    flatten(taskEither)(validationTask).run().then(
      (e) => {
        e.fold(
          (error) => reject(error),
          (_) => resolve(successMessage())
        )
      }
    )
  });
};

const successMessage = (): JsonMessage => {
  return {
    success: true,
    message: 'All Valid'
  }
}
