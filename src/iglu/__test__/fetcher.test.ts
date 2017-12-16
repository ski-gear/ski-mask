import "mocha";
import * as chai from "chai";
import { expect } from "chai";
import { fromEither } from "fp-ts/lib/TaskEither";
import * as path from "path";
import { path as rPath } from "ramda";
import { fetchSchema } from "../fetcher";
import { getJsonFromFile } from "../../__test__/test.helpers";
import { IgluResolverSchema } from "../../types/Types";
import TestRecorder from "../../TestRecorder";

const fixturesDir = path.join(__dirname, 'fixtures', 'recorded');
const recorder = TestRecorder("fetcher", { fixturesDir });

const resolverFilePath = path.join(__dirname, "fixtures", "resolver.json");
const incorrectResolverFilePath = path.join(__dirname, "fixtures", "resolver.incorrect.json");

describe("Iglu/fetcher", () => {
  before(recorder.before)
  after(recorder.after);

  describe("fetchSchema", () => {
    describe("with a valid schema URL and valid resolver config", () => {
      it("returns a right", () => {
        const igluSchemaUrl = "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0";
        const resolverConfig = getJsonFromFile(resolverFilePath) as IgluResolverSchema;
        return fetchSchema(resolverConfig, igluSchemaUrl)
          .run()
          .then(d => {
            expect(d.isRight()).to.be.true;
          });
      });
    });

    describe("with an invalid schema URL", () => {
      it("returns a left with an appropriate message", () => {
        const igluSchemaUrl = "what:is:this:url/awesome";
        const resolverConfig = getJsonFromFile(resolverFilePath) as IgluResolverSchema;
        return fetchSchema(resolverConfig, igluSchemaUrl)
          .run()
          .then(d => {
            expect(d.isLeft()).to.be.true;
            expect(rPath(["message"], d.value)).to.match(/Iglu Schema regex match failed/);
          });
      });
    });

    describe("with an incorrect resolver config", () => {
      it("returns a left with an appropriate message", () => {
        const igluSchemaUrl = "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0";
        const resolverConfig = getJsonFromFile(incorrectResolverFilePath) as IgluResolverSchema;
        return fetchSchema(resolverConfig, igluSchemaUrl)
          .run()
          .then(d => {
            expect(d.isLeft()).to.be.true;
            expect(rPath(["message"], d.value)).to.match(/Could not find a valid Repository/);
          });
      });
    });
  });
});
