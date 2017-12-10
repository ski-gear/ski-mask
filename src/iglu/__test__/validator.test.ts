import 'mocha';

import { expect } from 'chai';
import { fromEither } from 'fp-ts/lib/TaskEither';
import * as path from 'path';
import { path as rPath } from "ramda";

import { readFile } from '../../file';
import { parseJson } from '../../json';
import { metaSchemaCheck, payloadSchemaCheck, reduceToListOfSchemas } from '../validator';
import { IgluResolverSchema, AnyJson } from '../../types/Types';

describe("Iglu/Validator", () => {
  // describe("payloadSchemaCheck", () => {
  //   describe("with a valid schema", () => {
  //     it("returns a right", () => {
  //       const file = readFile(path.join(__dirname, "fixtures", "payload.json"));
  //       const json = file.chain(parseJson);
  //       const data = json.chain(payloadSchemaCheck);
  //       expect(data.isRight()).to.be.true;
  //     });
  //   });

  //   describe("with invalid schema", () => {
  //     it("returns a left with a helpful message", () => {
  //       const file = readFile(path.join(__dirname, "fixtures", "payload.bad.json"));
  //       const json = file.chain(parseJson);
  //       const data = json.chain(payloadSchemaCheck);
  //       expect(data.isLeft()).to.be.true;
  //       expect(rPath(['message'], data.value)).to.match(/.*JSON schema validation failed.*/);
  //       expect(rPath(['context'], data.value)).to.match(/.*required property.*data.*/);
  //     });
  //   });

  //   describe("with a non-existent file", () => {
  //     it("returns a left with a helpful message", () => {
  //       const file = readFile(path.join(__dirname, "fixtures", "payload.what.json"));
  //       const json = file.chain(parseJson);
  //       const data = json.chain(payloadSchemaCheck);
  //       expect(data.isLeft()).to.be.true;
  //       expect(rPath(['message'], data.value)).to.match(/.*Failed to read file.*/);
  //       expect(rPath(['context'], data.value)).to.match(/.*no such file or directory.*/);
  //     });
  //   });
  // });

  describe.only('Stuff', () => {
   it('tests stuff', () => {
    const payload = {
        "schema": "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
        "data": [
            {
                "schema": "iglu:au.com.realestate/page/jsonschema/1-0-0",
                "data": {
                    "page_name": "rea:sold:property details",
                    "page_type": "property details",
                    "site": "rea",
                    "site_sub_section": "rea:sold:property details",
                    "language": "english",
                    "platform": "web",
                    "responsive_layout": "XL",
                    "site_section": "sold"
                }
            },
            {
                "schema": "iglu:au.com.realestate/adobe_events/jsonschema/1-0-0",
                "data": {
                    "event_name": "property_views,product_depth_premiere"
                }
            },
            {
                "schema": "iglu:au.com.realestate/listing/jsonschema/1-0-1",
                "data": {
                    "listing_id": "126964378",
                    "agency_id": "XFGDKV",
                    "product_depth": "premiere",
                    "price_range": "1m_3m",
                    "construction_status": "established"
                }
            },
            {
                "schema": "iglu:au.com.realestate/property/jsonschema/2-0-0",
                "data": {
                    "property_id": "3954179",
                    "state": "Vic",
                    "suburb": "Richmond",
                    "postcode": "3121",
                    "region": "inner_east_melbourne",
                    "bedrooms": 2,
                    "bathrooms": 1,
                    "car_spaces": 0,
                    "property_type": "house"
                }
            },
            {
                "schema": "iglu:au.com.realestate/user/jsonschema/1-0-0",
                "data": {
                    "user_login_status": "logged in",
                    "my_rea_id": "ff8081813b8816e8013b8a43842a57b8",
                    "my_rea_anon_id": "ff8081813b8816e8013b8a43842a57b8"
                }
            }
        ]
    }

    const resolverJson = {
      "schema": "iglu:com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0",
      "data":
      {
        "cacheSize": 500,
        "repositories":
        [
          {
            "name": "Iglu Central",
            "priority": 0,
            "vendorPrefixes":
            [
              "com.snowplowanalytics.snowplow",
              "com.snowplowanalytics.iglu"
            ],
            "connection":
            {
              "http":
              {
                "uri": "http://iglucentral.com"
              }
            }
          },
          {
            "name": "REA Group",
            "priority": 1,
            "vendorPrefixes":
            [
              "au.com.realestate"
            ],
            "connection":
            {
              "http":
              {
                "uri": "http://iglu.data.e2e.realestate.com.au"
              }
            }
          }
        ]
      }
    }

     payloadSchemaCheck(payload, resolverJson).run().then(
       (e) => e.fold(
         console.log,
         console.log
       )
     );
   }); 
  });

  // describe("metaSchemaCheck", () => {
  //   describe("with a valid schema", () => {
  //     it("returns a right", () => {
  //       const file = readFile(path.join(__dirname, "fixtures", "schema.json"));
  //       const json = file.chain(parseJson);
  //       const data = json.chain(metaSchemaCheck);
  //       expect(data.isRight()).to.be.true;
  //     });
  //   });

  //   describe("with invalid schema", () => {
  //     it("returns a left with a helpful message", () => {
  //       const file = readFile(path.join(__dirname, "fixtures", "schema.invalid.json"));
  //       const json = file.chain(parseJson);
  //       const data = json.chain(metaSchemaCheck);
  //       expect(data.isLeft()).to.be.true;
  //       expect(rPath(['message'], data.value)).to.match(/.*JSON schema validation failed.*/);
  //       expect(rPath(['context'], data.value)).to.match(/.*required property.*self.*/);
  //     });
  //   });

  //   describe("with a non-existent file", () => {
  //     it("returns a left with a helpful message", () => {
  //       const file = readFile(path.join(__dirname, "fixtures", "schema.what.json"));
  //       const json = file.chain(parseJson);
  //       const data = json.chain(metaSchemaCheck);
  //       expect(data.isLeft()).to.be.true;
  //       expect(rPath(['message'], data.value)).to.match(/.*Failed to read file.*/);
  //       expect(rPath(['context'], data.value)).to.match(/.*no such file or directory.*/);
  //     });
  //   });
  // });
});
