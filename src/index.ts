import { liftA2 } from "fp-ts/lib/Apply";
import { flatten } from "fp-ts/lib/Chain";
import { compose, curry } from "fp-ts/lib/function";
import { fromEither, of as teOf, taskEither } from "fp-ts/lib/TaskEither";
import { PathLike } from "fs";
import { path } from "ramda";
import { validateIgluData, validateIgluResolverSchema } from "./iglu/validator";

import { either } from "fp-ts/lib/Either";
import { readFile } from "./file";
import { fetchSchema } from "./iglu/fetcher";
import { parseJson, validateSchema } from "./json";
import { readResolverConfigFromFile } from "./resolver";
import { AnyJson, IgluResolverSchema, JsonMessage} from "./types/Types";

export const validate = (json: AnyJson, resolverConfig: AnyJson): Promise<JsonMessage> => {
  const validatedResolverConfig = validateIgluResolverSchema(resolverConfig);
  const dataTask = teOf(json).mapLeft((_) => dummyJsonMessage);
  const validatedPayloadJson = liftA2(taskEither)(curry(validateIgluData))(dataTask)(validatedResolverConfig);

  return new Promise((resolve, reject) => {
    flatten(taskEither)(validatedPayloadJson).run().then(
      (e) => {
        e.fold(
          (error) => reject(error),
          (_) => resolve(successMessage()),
        );
      },
    );
  });
};

const dummyJsonMessage: JsonMessage = {
	success: false,
	message: "Dummy",
};

const successMessage = (): JsonMessage => {
  return {
    success: true,
    message: "All Valid",
  };
};
