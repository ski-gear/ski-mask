import 'mocha';

import { expect } from 'chai';
import { fromEither } from 'fp-ts/lib/TaskEither';
import * as path from 'path';
import { path as rPath } from "ramda";

import { readFile } from '../../file';
import { parseJson } from '../../json';
import { metaSchemaCheck, payloadSchemaCheck } from '../validator';

describe("Iglu/Validator", () => {
  describe("payloadSchemaCheck", () => {
    describe("with a valid schema", () => {
      it("returns a right", () => {
        const file = readFile(path.join(__dirname, "fixtures", "payload.json"));
        const json = file.chain(parseJson);
        const data = json.chain(payloadSchemaCheck);
        expect(data.isRight()).to.be.true;
      });
    });

    describe("with invalid schema", () => {
      it("returns a left with a helpful message", () => {
        const file = readFile(path.join(__dirname, "fixtures", "payload.bad.json"));
        const json = file.chain(parseJson);
        const data = json.chain(payloadSchemaCheck);
        expect(data.isLeft()).to.be.true;
        expect(rPath(['message'], data.value)).to.match(/.*JSON schema validation failed.*/);
        expect(rPath(['context'], data.value)).to.match(/.*required property.*data.*/);
      });
    });

    describe("with a non-existent file", () => {
      it("returns a left with a helpful message", () => {
        const file = readFile(path.join(__dirname, "fixtures", "payload.what.json"));
        const json = file.chain(parseJson);
        const data = json.chain(payloadSchemaCheck);
        expect(data.isLeft()).to.be.true;
        expect(rPath(['message'], data.value)).to.match(/.*Failed to read file.*/);
        expect(rPath(['context'], data.value)).to.match(/.*no such file or directory.*/);
      });
    });
  });

  describe("metaSchemaCheck", () => {
    describe("with a valid schema", () => {
      it("returns a right", () => {
        const file = readFile(path.join(__dirname, "fixtures", "schema.json"));
        const json = file.chain(parseJson);
        const data = json.chain(metaSchemaCheck);
        expect(data.isRight()).to.be.true;
      });
    });

    describe("with invalid schema", () => {
      it("returns a left with a helpful message", () => {
        const file = readFile(path.join(__dirname, "fixtures", "schema.invalid.json"));
        const json = file.chain(parseJson);
        const data = json.chain(metaSchemaCheck);
        expect(data.isLeft()).to.be.true;
        expect(rPath(['message'], data.value)).to.match(/.*JSON schema validation failed.*/);
        expect(rPath(['context'], data.value)).to.match(/.*required property.*self.*/);
      });
    });

    describe("with a non-existent file", () => {
      it("returns a left with a helpful message", () => {
        const file = readFile(path.join(__dirname, "fixtures", "schema.what.json"));
        const json = file.chain(parseJson);
        const data = json.chain(metaSchemaCheck);
        expect(data.isLeft()).to.be.true;
        expect(rPath(['message'], data.value)).to.match(/.*Failed to read file.*/);
        expect(rPath(['context'], data.value)).to.match(/.*no such file or directory.*/);
      });
    });
  });
});
