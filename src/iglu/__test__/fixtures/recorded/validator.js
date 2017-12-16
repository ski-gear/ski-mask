import * as nock from 'nock';
nock('http://iglu.data.e2e.realestate.com.au:80', {"encodedQueryParams":true})
  .get('/schemas/au.com.realestate/adobe_events/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for adobe_events","self":{"vendor":"au.com.realestate","name":"adobe_events","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"event_name":{"type":"string"},"event_serial":{"type":"string"}},"required":["event_name"],"additionalProperties":false}, [ 'x-amz-id-2',
  'F2IM976hC+oSZZtzUhpPBmuytX/rZeIcQHTH6LgXlE3pvNu53OfRkxwafrxFZnQZyFk/yA5iR/Q=',
  'x-amz-request-id',
  '666583128F8796FD',
  'Date',
  'Sat, 16 Dec 2017 06:12:42 GMT',
  'Last-Modified',
  'Fri, 15 Dec 2017 03:46:45 GMT',
  'ETag',
  '"0ce0be62173de0f55e762bb914a21b49"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '489',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglu.data.e2e.realestate.com.au:80', {"encodedQueryParams":true})
  .get('/schemas/au.com.realestate/listing/jsonschema/1-0-1')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for listing","self":{"vendor":"au.com.realestate","name":"listing","format":"jsonschema","version":"1-0-1"},"type":"object","properties":{"listing_id":{"type":"string","description":"Unique id of the listing"},"agency_id":{"type":["string","null"],"description":"Unique id of the agency that owns the listing"},"price_range":{"type":"string","description":"Abbreviated price range for property in low_high format. "},"construction_status":{"type":"string","description":"Whether the property is a new build or existing","enum":["new","established"]},"product_depth":{"type":"string","description":"Which listing product type is being viewed.","enum":["premiere","signature","mid tier","standard","default","eas"]}},"required":["listing_id"],"additionalProperties":false}, [ 'x-amz-id-2',
  'p2RViMKtnlqtU50J+sVVrFjqEQcaBDfoR0F1jEcpXJF1gSfvGaV+45X61cMUN4uWhYOmmHKzyZY=',
  'x-amz-request-id',
  '1110E5F786C1FEC6',
  'Date',
  'Sat, 16 Dec 2017 06:12:42 GMT',
  'Last-Modified',
  'Fri, 15 Dec 2017 03:46:45 GMT',
  'ETag',
  '"0ef0911f1267ef8932cf3d7244b88030"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '1120',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglu.data.e2e.realestate.com.au:80', {"encodedQueryParams":true})
  .get('/schemas/au.com.realestate/property/jsonschema/2-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for property","self":{"vendor":"au.com.realestate","name":"property","format":"jsonschema","version":"2-0-0"},"type":"object","properties":{"property_id":{"type":"string","description":"Unique id of the property being listed"},"state":{"type":"string","description":"State that property is located in"},"suburb":{"type":"string","description":"Suburb that property is located in"},"postcode":{"type":"string","description":"Postcode of property is located in"},"region":{"type":"string","description":"Greater geographical region of the property"},"bedrooms":{"type":"integer","description":"Number of bedrooms "},"bathrooms":{"type":"integer","description":"Number of bathrooms"},"car_spaces":{"type":"integer","description":"Number of car spaces"},"year_built":{"type":"integer","description":"Year that the property was built"},"property_type":{"type":"string","description":"Type of property","enum":["house","unit","land","villa"]}},"required":["property_id"],"additionalProperties":false}, [ 'x-amz-id-2',
  'NI7gaqWRSdvC3I86bmEn3qpP9SsQIZOVmnGsTf5Csz8yLTToW3MlZNl5ddTuCt+4HYEnDZpPnko=',
  'x-amz-request-id',
  'A845942B369ECBCE',
  'Date',
  'Sat, 16 Dec 2017 06:12:42 GMT',
  'Last-Modified',
  'Fri, 15 Dec 2017 03:46:45 GMT',
  'ETag',
  '"2e58673b158385740d1c03a073923db4"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '1476',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglu.data.e2e.realestate.com.au:80', {"encodedQueryParams":true})
  .get('/schemas/au.com.realestate/user/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for user","self":{"vendor":"au.com.realestate","name":"user","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"user_login_status":{"type":"string","description":"Whether a the user is logged in or not","enum":["logged in","logged_out","not logged in"]},"my_rea_id":{"type":["string","null"],"description":"ID for each visitor who is logged in on My Rea"},"my_rea_anon_id":{"type":["string","null"],"description":"ID for each visitor irrespective of whether they have a MyREA login"},"reauid":{"type":"string","description":"New unique ID for all visitors"}},"required":["user_login_status"],"additionalProperties":false}, [ 'x-amz-id-2',
  '+Qa14Ik4i4v1cjxXF0eAu5ax9wqWAwhe7O3NR20AUrdatlJl2JW58tNAg3/yEajX52oXkTSWrUM=',
  'x-amz-request-id',
  '48B6E20F0E820C2D',
  'Date',
  'Sat, 16 Dec 2017 06:12:42 GMT',
  'Last-Modified',
  'Fri, 15 Dec 2017 03:46:45 GMT',
  'ETag',
  '"592a291d696e472b7dd853697872b034"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '950',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglu.data.e2e.realestate.com.au:80', {"encodedQueryParams":true})
  .get('/schemas/au.com.realestate/page/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for page","self":{"vendor":"au.com.realestate","name":"page","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"page_name":{"type":"string","description":"The user-friendly name of the page. Syntax is: <site>:<site section>:<site sub section>:<page type>"},"page_type":{"type":"string","description":"Shortened page name, just the type"},"site":{"type":"string","description":"Descriptor of the site","enum":["reamob","pca","rea"]},"site_section":{"type":"string","description":"Which site section this page relates to"},"site_sub_section":{"type":"string","description":"Which logical section within the Site Section is being viewed. The value is made up of <site>:<site section>:<sub section>"},"site_sub_sub_section":{"type":"string","description":"4th level below subsection.  The value format is <site>:<site section>:<sub section>:<sub-sub section>"},"language":{"type":"string","description":"The language of the page being displayed"},"platform":{"type":"string","description":"Represents the device the Consumer is using","enum":["msite","web","ipadapp","iphoneapp","android"]},"responsive_layout":{"type":"string","description":"The size of the page layout","enum":["S","M1","M2","L","XL"]}},"required":["page_name","page_type","site","language","platform"],"additionalProperties":false}, [ 'x-amz-id-2',
  'YXN82t16jdtkYgIhzlabDrrMHp8tgbEoClFsYE6nphwXUqVpczp41dmfpEkzyRY/Ktx33web0U0=',
  'x-amz-request-id',
  'DCF5AB40EAB59169',
  'Date',
  'Sat, 16 Dec 2017 06:12:42 GMT',
  'Last-Modified',
  'Fri, 15 Dec 2017 03:46:45 GMT',
  'ETag',
  '"77fdffc8ded300e3382db3326a4674d8"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '1785',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for custom contexts","self":{"vendor":"com.snowplowanalytics.snowplow","name":"contexts","format":"jsonschema","version":"1-0-0"},"type":"array","items":{"type":"object","properties":{"schema":{"type":"string","pattern":"^iglu:[a-zA-Z0-9-_.]+/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/[0-9]+-[0-9]+-[0-9]+$"},"data":{}},"required":["schema","data"],"additionalProperties":false},"minItems":1}, [ 'x-amz-id-2',
  '2+NZY7xelNdCQRlW/LuD5paqGmNfqHrigKLpl6uY+4QpafQMTgRc630qa4Jp5SoUnbuMTCRVwCU=',
  'x-amz-request-id',
  '37083706E45341A1',
  'Date',
  'Sat, 16 Dec 2017 06:12:42 GMT',
  'Last-Modified',
  'Wed, 13 Dec 2017 13:58:34 GMT',
  'ETag',
  '"2a07ca78a021aaf603ae30068ff3764d"',
  'Content-Type',
  'binary/octet-stream',
  'Content-Length',
  '597',
  'Server',
  'AmazonS3',
  'Connection',
  'close' ]);


nock('http://iglucentral.com:80', {"encodedQueryParams":true})
  .get('/schemas/com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for a link click event","self":{"vendor":"com.snowplowanalytics.snowplow","name":"link_click","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"elementId":{"type":"string"},"elementClasses":{"type":"array","items":{"type":"string"}},"elementTarget":{"type":"string"},"targetUrl":{"type":"string","minLength":1}},"required":["targetUrl"],"additionalProperties":false}, [ 'x-amz-id-2',
  'HiQTgT9GsgGwcYYiQZmpKZ5b4V8QJ0PVYxQW7xQW9E5sJYGeGrxqtamfZWUK3wfU5OUzDhX3GfY=',
  'x-amz-request-id',
  '6B35E5043C809981',
  'Date',
  'Sat, 16 Dec 2017 06:12:43 GMT',
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
  'RW9lSY0ahIAfYZY+ctNRWu9UpJPmoeCLD8VfVEq4OzC8gpNUHphOi6MVl/oflQnALtcK5Omq9K4=',
  'x-amz-request-id',
  '40D387CD565B1571',
  'Date',
  'Sat, 16 Dec 2017 06:12:43 GMT',
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
  'kIYlYNeA558j+8ORN9NOp6Vs1LCm9TpeCkaKlqiktNN+ulHMlt7lXSfgQ14lzNC69a/4lEMz1i0=',
  'x-amz-request-id',
  '9804D2655C9C0D07',
  'Date',
  'Sat, 16 Dec 2017 06:12:45 GMT',
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
  .get('/schemas/com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0')
  .reply(200, {"$schema":"http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#","description":"Schema for an Iglu resolver's configuration","self":{"vendor":"com.snowplowanalytics.iglu","name":"resolver-config","format":"jsonschema","version":"1-0-0"},"type":"object","properties":{"cacheSize":{"type":"integer","minimum":0},"repositories":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"priority":{"type":"integer"},"vendorPrefixes":{"type":"array","items":{"type":"string"}},"connection":{"type":"object","oneOf":[{"properties":{"embedded":{"type":"object","properties":{"path":{"type":"string"}},"required":["path"],"additionalProperties":false}},"required":["embedded"],"additionalProperties":false},{"properties":{"http":{"type":"object","properties":{"uri":{"type":"string","format":"uri"}},"required":["uri"],"additionalProperties":false}},"required":["http"],"additionalProperties":false}]}},"required":["name","priority","vendorPrefixes","connection"],"additionalProperties":false}}},"required":["cacheSize","repositories"],"additionalProperties":false}, [ 'x-amz-id-2',
  'C300xn+pBW7one2dE8WgDHCh8CM8fiutkI56GbqAU/f4Zcoaf+O7v0IGtQU6c6Lgwc92i9Ak5p0=',
  'x-amz-request-id',
  '6C7011B293016C67',
  'Date',
  'Sat, 16 Dec 2017 06:12:45 GMT',
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
