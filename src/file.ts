import { Either, left, right } from "fp-ts/lib/Either";
import { PathLike } from "fs";
import * as fs from "fs";
import { JsonMessage } from "src/types/Types";

export const readFile = (filePath: PathLike): Either<JsonMessage, string> => {
  try {
    return right(fs.readFileSync(filePath).toString());
  } catch (e) {
    return left({
      context: e,
      message: "Failed to read file.",
      success: false,
    });
  }
};
