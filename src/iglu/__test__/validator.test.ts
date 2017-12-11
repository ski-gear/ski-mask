import 'mocha';

import { expect } from 'chai';
import { fromEither } from 'fp-ts/lib/TaskEither';
import * as path from 'path';
import { path as rPath } from "ramda";

import { readFile } from '../../file';
import { parseJson } from '../../json';
import { validateIgluData, validateIgluResolverSchema } from '../validator';
import { IgluResolverSchema, AnyJson } from '../../types/Types';
import * as vcr from 'nock-vcr-recorder';

describe("Iglu/Validator", () => {
  describe('validateIgluData', () => {
    describe('with a valid payload', () => {
      it('returns a success', () => {
        return vcr.useCassette('iglu-payload', { writeOnFailure: true }, () => {
          const payload = require('./fixtures/payload.json');
          const resolverConfig = require('./fixtures/resolver.json');

          return validateIgluData(payload, resolverConfig).run().then(
            (e) => e.fold(
              (e) => { throw new Error(`Should have passed the validation. Failed with ${JSON.stringify(e)}`) },
              (d) => expect(d).to.match(/Valid Payload/)
            )
          );
        });
      });
    });

    describe('with an invalid payload', () => {
      it('returns an error message', () => {
        return vcr.useCassette('iglu-payload', { writeOnFailure: true }, () => {
          const payload = require('./fixtures/payload.bad.json');
          const resolverConfig = require('./fixtures/resolver.json');

          return validateIgluData(payload, resolverConfig).run().then(
            (e) => e.fold(
              (e) => {
                expect(e.message).to.match(/JSON schema validation failed/)
                expect(e.context).to.match(/should be string.*\/properties\/elementId\/type/)
              },
              (d) => { throw new Error('Should not have passed the validation') }
            )
          );
        });
      });
    });

    describe('with an incorrect Schema config', () => {
      it('returns an error message', () => {
        return vcr.useCassette('iglu-payload', () => {
          const payload = require('./fixtures/payload.json');
          const resolverConfig = require('./fixtures/resolver.incorrect.json');

          return validateIgluData(payload, resolverConfig).run().then(
            (e) => e.fold(
              (e) => {
                expect(e.message).to.match(/Could not find a valid Repository/)
                expect(e.context).to.match(/com.snowplowanalytics.snowplow/)
              },
              (d) => { throw new Error('Should not have passed the validation') }
            )
          );
        });
      });
    });

    describe('with an invalid Schema configuration', () => {
      it('returns an error message', () => {
        return vcr.useCassette('iglu-payload', () => {
          const payload = require('./fixtures/payload.json');
          const resolverConfig = require('./fixtures/resolver.invalid.json');

          return validateIgluData(payload, resolverConfig).run().then(
            (e) => e.fold(
              (e) => {
                expect(e.message).to.match(/Could not find a valid Repository/)
                expect(e.context).to.match(/com.snowplowanalytics.snowplow/)
              },
              (d) => { throw new Error('Should not have passed the validation') }
            )
          );
        });
      })
    });;
  });

  describe('validateIgluResolverSchema', () => {
    describe('with a valid resolver config', () => {
      it('returns a success', () => {
        return vcr.useCassette('iglu-resolver', { writeOnFailure: false }, () => {
          const resolverConfig = require('./fixtures/resolver.json');

          return validateIgluResolverSchema(resolverConfig).run().then(
            (e) => e.fold(
              (e) => { throw new Error(`Should have passed the validation. Failed with ${JSON.stringify(e)}`) },
              (d) => expect(d.schema).to.match(/iglu\:com\.snowplowanalytics\.iglu\/resolver\-config\/jsonschema\/1\-0\-0/)
            )
          );
        });
      });
    });

    describe('with an invalid resolver config', () => {
      it('returns a failure', () => {
        return vcr.useCassette('iglu-resolver', () => {
          const resolverConfig = require('./fixtures/resolver.invalid.json');

          return validateIgluResolverSchema(resolverConfig).run().then(
            (e) => e.fold(
              (e) => {
                expect(e.message).to.match(/JSON schema validation failed/)
                expect(e.context).to.match(/should NOT have additional properties/)
              },
              (d) => { throw new Error('Should not have passed the validation') }
            )
          );
        });
      });
    });
  });
});
