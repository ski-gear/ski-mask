import { validate } from "../index";
import { expect } from "chai";
import * as chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import "mocha";
import * as path from "path";
import * as fs from "fs";
import { path as rPath, prop } from "ramda";
import { AnyJson } from "../types/Types";
import { PathLike } from "fs";
import { getJsonFromFile } from "./test.helpers";
import TestRecorder from '../TestRecorder';

chai.use(ChaiAsPromised);
const fixturesDir = path.join(__dirname, 'fixtures', 'recorded');
const recorder = TestRecorder("index", { fixturesDir });

describe("Index", () => {
	before(recorder.before)
	after(recorder.after);

	describe("validate", () => {
		describe("with valid json data", () => {
			it("returns a resolved promise with a success message", async () => {
				const jsonFile = getJsonFromFile(path.join(__dirname, "fixtures", "payload.json"));

				const resolverConfigFile = getJsonFromFile(path.join(__dirname, "fixtures", "resolver.json"));

				const validation = await validate(jsonFile, resolverConfigFile);
				expect(validation.success).to.be.true;
				expect(validation.message).to.match(/All Valid/);
			});
		});

		describe("with invalid json data", () => {
			it("returns a rejected promise with an appropriate message", () => {
				const jsonFile = getJsonFromFile(path.join(__dirname, "fixtures", "payload.bad.json"));

				const resolverConfigFile = getJsonFromFile(path.join(__dirname, "fixtures", "resolver.json"));

				const validation = validate(jsonFile, resolverConfigFile);
				return expect(validation).to.eventually.be.rejectedWith(/JSON schema validation failed/);
			});
		});

		describe("with valid json data but with top level schema messed up", () => {
			it("returns a rejected promise with an appropriate message", () => {
				const jsonFile = getJsonFromFile(path.join(__dirname, "fixtures", "payload.bad.json"));

				const resolverConfigFile = getJsonFromFile(path.join(__dirname, "fixtures", "resolver.json"));

				const validation = validate(jsonFile, resolverConfigFile);
				return expect(validation).to.eventually.be.rejectedWith(/JSON schema validation failed/);
			});
		});
	});
});
