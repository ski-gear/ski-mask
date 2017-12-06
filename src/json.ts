import { Either, left, right, traverse } from 'fp-ts/lib/Either';
import { Task, task } from 'fp-ts/lib/Task';
import { left as teLeft, right as teRight, TaskEither } from 'fp-ts/lib/TaskEither';
import {  Ajv } from "ajv";
import * as ajv from 'ajv';
import { map, propOr, join } from "ramda";

import { error } from 'util';
import { IgluSchema, JsonMessage } from './types/Types';

export type AnyJson =  boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {  [key: string]: AnyJson; }
interface JsonArray extends Array<AnyJson> {}

export const parseJson = (json: string): Either<JsonMessage, AnyJson> => {
  try {
    return right(JSON.parse(json));
  } catch (e) {
    return left({
      success: false,
      message: "JSON parse error.",
      context: `Could not parse: "${JSON.stringify(json)}"`,
    });
  }
};

export const validateSchema = (json: AnyJson, schema: IgluSchema): Either<JsonMessage, AnyJson> => {
  const validator = getValidator();
  const validate = validator.compile(schema);
  const valid = validate(json);
  if (valid) {
    return right(json);
  } else {
    const error: JsonMessage = {
      success: false,
      message: `JSON schema validation failed for ${JSON.stringify(json)}`,
      context:  getErrorMessages(validate.errors as ajv.ErrorObject[])
    };
    return left(error);
  }
};

const getValidator = (): Ajv => {
  const v = new ajv(
    { 
      validateSchema: false,
      unknownFormats: ['strict-uri'],
      errorDataPath: 'property'
    }
  );
  v.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'), "draft4");
  return v;
}

const getErrorMessages = (errors: ajv.ErrorObject[]): string => {
  const messages = map(
    (e) => {
      const msg = propOr('No Error', 'message', e);
      const dataPath = propOr('stuff', 'dataPath', e);
      return join(': ', [msg, dataPath]);
    },
    errors
  ) as string[];

  return join('\n', messages);
}
