import * as nock from 'nock';
nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for an Iglu resolver's configuration","self":{"vendor":"com.snowplowanalytics.iglu","name":"resolver-config","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"cacheSize":{"type":"integer","minimum":0},"repositories":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"priority":{"type":"integer"},"vendorPrefixes":{"type":"array","items":{"type":"string"}},"connection":{"type":"object","oneOf":[{"properties":{"embedded":{"type":"object","properties":{"path":{"type":"string"}},"required":["path"],"additionalProperties":false}},"required":["embedded"],"additionalProperties":false},{"properties":{"http":{"type":"object","properties":{"uri":{"type":"string","format":"uri"}},"required":["uri"],"additionalProperties":false}},"required":["http"],"additionalProperties":false}]}},"required":["name","priority","vendorPrefixes","connection"],"additionalProperties":false}}},"required":["cacheSize","repositories"],"additionalProperties":false}, [ 'x-amz-id-2',
  '+zojVuE9mVxHMC8vtQHGUEA4K5AamtR2YRC8aFHFBkflNtOlfV2m/CiCkmFOmrXf2LOhkHHkyR0=',
  'x-amz-request-id',
  '3C54A10EB582DF47',
  'Date',
  'Sat, 16 Dec 2017 05:56:01 GMT',
  'Last-Modified',
  'Wed, 13 Dec 2017 13:58:33 GMT',
  'ETag',
  '"b7707a33a664f362746c93c6eb3a20b2"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '1728',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for a link click event","self":{"vendor":"com.snowplowanalytics.snowplow","name":"link_click","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"elementId":{"type":"string"},"elementClasses":{"type":"array","items":{"type":"string"}},"elementTarget":{"type":"string"},"targetUrl":{"type":"string","minLength":1}},"required":["targetUrl"],"additionalProperties":false}, [ 'x-amz-id-2',
  'vrekKFM/2ZPzxqK7tz03w1Wt1uq8aDYmhyzKxyPB2hzaff7yok+o3HyVol8+lzAz1lfStBrJNok=',
  'x-amz-request-id',
  'C99200A876E3DD89',
  'Date',
  'Sat, 16 Dec 2017 05:56:02 GMT',
  'Last-Modified',
  'Wed, 13 Dec 2017 13:58:34 GMT',
  'ETag',
  '"3e45eee8f2b33b7390fe89839130aac5"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '623',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for a Snowplow unstructured event","self":{"vendor":"com.snowplowanalytics.snowplow","name":"unstruct_event","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"schema":{"type":"string","pattern":"^iglu:[a-zA-Z0-9-_.]+/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/[0-9]+-[0-9]+-[0-9]+$"},"data":{}},"required":["schema","data"],"additionalProperties":false}, [ 'x-amz-id-2',
  'IgdIfpp1bQFPsHKYduMDbJUb86eOWurrMtRswbkaSlko5s6aZZXRhWmd/rTvt1AiwRSRwZaAEVU=',
  'x-amz-request-id',
  'FCF5B2BEEA3723AA',
  'Date',
  'Sat, 16 Dec 2017 05:56:02 GMT',
  'Last-Modified',
  'Wed, 13 Dec 2017 13:58:35 GMT',
  'ETag',
  '"5a3ffaf20e5859c17e96ecaf56c31608"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '556',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for an Iglu resolver's configuration","self":{"vendor":"com.snowplowanalytics.iglu","name":"resolver-config","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"cacheSize":{"type":"integer","minimum":0},"repositories":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"priority":{"type":"integer"},"vendorPrefixes":{"type":"array","items":{"type":"string"}},"connection":{"type":"object","oneOf":[{"properties":{"embedded":{"type":"object","properties":{"path":{"type":"string"}},"required":["path"],"additionalProperties":false}},"required":["embedded"],"additionalProperties":false},{"properties":{"http":{"type":"object","properties":{"uri":{"type":"string","format":"uri"}},"required":["uri"],"additionalProperties":false}},"required":["http"],"additionalProperties":false}]}},"required":["name","priority","vendorPrefixes","connection"],"additionalProperties":false}}},"required":["cacheSize","repositories"],"additionalProperties":false}, [ 'x-amz-id-2',
  '89Zf9aUoqpdZDPon54FJ6dRXBUe1+bMLxmHtmo/1qL9MQma9ZOiuao064JOQ/S5CtYG4XraMXgE=',
  'x-amz-request-id',
  '2DBD35DDE656DFD5',
  'Date',
  'Sat, 16 Dec 2017 05:56:02 GMT',
  'Last-Modified',
  'Wed, 13 Dec 2017 13:58:33 GMT',
  'ETag',
  '"b7707a33a664f362746c93c6eb3a20b2"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '1728',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for a Snowplow unstructured event","self":{"vendor":"com.snowplowanalytics.snowplow","name":"unstruct_event","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"schema":{"type":"string","pattern":"^iglu:[a-zA-Z0-9-_.]+/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/[0-9]+-[0-9]+-[0-9]+$"},"data":{}},"required":["schema","data"],"additionalProperties":false}, [ 'x-amz-id-2',
  '5b5rUypkB3CTfBsJJLQXK6fCcVgI50hvH2nLJkf4/8ux1fiiVuwzvZD2IUpaWowDKU5bTPr13c4=',
  'x-amz-request-id',
  'AE6361E21DF64C67',
  'Date',
  'Sat, 16 Dec 2017 05:56:03 GMT',
  'Last-Modified',
  'Wed, 13 Dec 2017 13:58:35 GMT',
  'ETag',
  '"5a3ffaf20e5859c17e96ecaf56c31608"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '556',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for an Iglu resolver's configuration","self":{"vendor":"com.snowplowanalytics.iglu","name":"resolver-config","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"cacheSize":{"type":"integer","minimum":0},"repositories":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"priority":{"type":"integer"},"vendorPrefixes":{"type":"array","items":{"type":"string"}},"connection":{"type":"object","oneOf":[{"properties":{"embedded":{"type":"object","properties":{"path":{"type":"string"}},"required":["path"],"additionalProperties":false}},"required":["embedded"],"additionalProperties":false},{"properties":{"http":{"type":"object","properties":{"uri":{"type":"string","format":"uri"}},"required":["uri"],"additionalProperties":false}},"required":["http"],"additionalProperties":false}]}},"required":["name","priority","vendorPrefixes","connection"],"additionalProperties":false}}},"required":["cacheSize","repositories"],"additionalProperties":false}, [ 'x-amz-id-2',
  'iUqR+MrAvIJFq6RJAuMxFxMoDFEz3ysgC4dMok12JvJ5cCnuWN3H4HA2sVH3ndJab6b21msS39E=',
  'x-amz-request-id',
  '7757AD0C11E052C2',
  'Date',
  'Sat, 16 Dec 2017 05:56:03 GMT',
  'Last-Modified',
  'Wed, 13 Dec 2017 13:58:33 GMT',
  'ETag',
  '"b7707a33a664f362746c93c6eb3a20b2"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '1728',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for a Snowplow unstructured event","self":{"vendor":"com.snowplowanalytics.snowplow","name":"unstruct_event","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"schema":{"type":"string","pattern":"^iglu:[a-zA-Z0-9-_.]+/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/[0-9]+-[0-9]+-[0-9]+$"},"data":{}},"required":["schema","data"],"additionalProperties":false}, [ 'x-amz-id-2',
  'RXSzGjzyYdaIkcsJtoKGg4fo5+wNpo2f2b6FFOt7bK9NAZFeXCRc6XG3vX2drKtUU7b59VHxWxI=',
  'x-amz-request-id',
  'B9902CF78066B36A',
  'Date',
  'Sat, 16 Dec 2017 05:56:04 GMT',
  'Last-Modified',
  'Wed, 13 Dec 2017 13:58:35 GMT',
  'ETag',
  '"5a3ffaf20e5859c17e96ecaf56c31608"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '556',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);
