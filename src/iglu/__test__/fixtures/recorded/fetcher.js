import * as nock from 'nock';
nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for a link click event","self":{"vendor":"com.snowplowanalytics.snowplow","name":"link_click","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"elementId":{"type":"string"},"elementClasses":{"type":"array","items":{"type":"string"}},"elementTarget":{"type":"string"},"targetUrl":{"type":"string","minLength":1}},"required":["targetUrl"],"additionalProperties":false}, [ 'x-amz-id-2',
  'lysM6PW9X4RxctdhEvgx/UzXKB4gO5eibtH/YEc/Po45T0r9UVx6j9KwP8MwPoh1qedwbfKV9TE=',
  'x-amz-request-id',
  'B2553753A58982ED',
  'Date',
  'Sat, 16 Dec 2017 06:10:40 GMT',
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
