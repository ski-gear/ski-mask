import {  Ajv } from "ajv";
import * as ajv from "ajv";
import { Either, left, right, traverse } from "fp-ts/lib/Either";
import { Task, task } from "fp-ts/lib/Task";
import { fromEither, TaskEither } from "fp-ts/lib/TaskEither";
import { join, map, propOr } from "ramda";

import { error } from "util";
import { AnyJson, IgluSchema, JsonMessage } from "./types/Types";

export const parseJson = (json: string): Either<JsonMessage, AnyJson> => {
  try {
    return right(JSON.parse(json));
  } catch (e) {
    return left({
      context: `Could not parse: "${JSON.stringify(json)}"`,
      message: "JSON parse error.",
      success: false,
    });
  }
};

export const validateSchema = (json: AnyJson, schema: AnyJson): Either<JsonMessage, AnyJson> => {
  const validator = getValidator();
  try {
    const validate = validator.compile(schema as object);
    if (validate(json)) {
      return right(json);
    } else {
      const errorMessage: JsonMessage = {
        context: getErrorMessages(validate.errors as ajv.ErrorObject[]),
        message: `JSON schema validation failed.`,
        success: false,
      };
      return left(errorMessage);
    }
  } catch (e) {
    const errorMessage: JsonMessage = {
      context:  JSON.stringify(schema),
      message: `Not a valid JSON schema`,
      success: false,
    };
    return left(errorMessage);
  }
};

const getValidator = (): Ajv => {
  const v = new ajv(
    {
      errorDataPath: "property",
      unknownFormats: ["strict-uri"],
      validateSchema: false,
      verbose: true
    },
  );
  v.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"), "draft4");
  return v;
};

const getErrorMessages = (errors: ajv.ErrorObject[]): string => {
  const messages = map(
    (e) => {
      const msg = propOr("No Error", "message", e);
      const dataPath = propOr("Unknown Path", "schemaPath", e);
      const schema = propOr("Unknown Path", "schema", e);
      const data = propOr("Unknown Object", "data", e);
      return `Path: ${dataPath} ${schema} ${msg}, in data: ${JSON.stringify(data, null, 4)}`;
    },
    errors,
  ) as string[];

  return join("\n", messages);
};
