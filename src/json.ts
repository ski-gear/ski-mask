import { Either, left, right, traverse } from 'fp-ts/lib/Either';
import { Task, task } from 'fp-ts/lib/Task';
import { TaskEither, fromEither } from 'fp-ts/lib/TaskEither';
import {  Ajv } from "ajv";
import * as ajv from 'ajv';
import { map, propOr, join } from "ramda";

import { error } from 'util';
import { IgluSchema, JsonMessage, AnyJson } from './types/Types';

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

export const validateSchema = (json: AnyJson, schema: AnyJson): Either<JsonMessage, AnyJson> => {
  const validator = getValidator();
  try {
    const validate = validator.compile(schema as object);
    if(validate(json)){
      return right(json)
    } else {
      const error: JsonMessage = {
        success: false,
        message: `JSON schema validation failed for ${JSON.stringify(json)}`,
        context: getErrorMessages(validate.errors as ajv.ErrorObject[])
      };
     return left(error)
    }
  } catch (e) {
    const error: JsonMessage = {
      success: false,
      message: `Not a valid JSON schema`,
      context:  JSON.stringify(schema)
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
      const dataPath = propOr('stuff', 'schemaPath', e);
      return join(': ', [msg, dataPath]);
    },
    errors
  ) as string[];

  return join('\n', messages);
}
