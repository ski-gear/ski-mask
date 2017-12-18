[![NPM](https://nodei.co/npm/ski-mask.png)](https://npmjs.org/package/ski-mask)

# Ski Mask

Schema validation tool for [Snowplow](https://snowplowanalytics.com/blog/2017/12/14/gdpr-compliance-in-digital-analytics-and-how-we-want-to-help/) [Iglu](https://github.com/snowplow/iglu-central) JSON schemas.

![logo](./readme-assets/icon.png)

---

## Demo
[JsonSchema.help](http://jsonschema.help) is powered by ski-mask.

---

## Command line Usage

1. Install `ski-mask`
```sh
npm install ski-mask -g
# Or
yarn global add ski-mask
```

2. Grab a valid Iglu resolver.json file that resolves to your Iglu server(s).

3. Run `ski-mask` to validate the payload.

```sh
ski-mask -r ./path/to/resolver.json -d ./path/to/snowplow-payload-data.json
```

### Example

1. Prepare your `data.json` file that represents your Snowplow Payload.

```json
{
  "schema": "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
  "data": {
    "schema": "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0",
    "data": {
      "targetUrl": "https://myawesomeurl.com/data",
      "elementId": "bestElementEver"
    }
  }
}
```

2. Grab your Iglu resolver config file and name it something like `resolver.json`.

```json
{
  "schema": "iglu:com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0",
  "data": {
    "cacheSize": 500,
    "repositories": [
      {
        "name": "Iglu Central",
        "priority": 0,
        "vendorPrefixes": ["com.snowplowanalytics.snowplow"],
        "connection": { "http": { "uri": "http://iglucentral.com" } }
      },
      {
        "name": "My Iglu Server",
        "priority": 1,
        "vendorPrefixes": ["com.my-iglu-server"],
        "connection": {
          "http": { "uri": "http://awesome-schemas.my-iglu-server.com" }
        }
      }
    ]
  }
}
```

3. Run `ski-mask` to validate the payload.

```sh
ski-mask -r ./path/to/resolver.json -d ./path/to/snowplow-payload-data.json
```

___

## Using it with Node.js projects

1. Add `ski-mask` to your `package.json`

```sh
npm install ski-mask
# or
yarn add ski-mask
```

2. Use the API

```javascript
const skiMask = require("ski-mask");
// or import validate from 'ski-mask'

const payload = {
  schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
  data: {
    schema: "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0",
    data: {
      targetUrl: "https://myawesomeurl.com/data",
      elementId: "bestElementEver",
    },
  },
};

const resolverConfig = {
  schema: "iglu:com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0",
  data: {
    cacheSize: 500,
    repositories: [
      {
        name: "Iglu Central",
        priority: 0,
        vendorPrefixes: ["com.snowplowanalytics.snowplow"],
        connection: {
          http: {
            uri: "http://iglucentral.com",
          },
        },
      },
      {
        name: "My Iglu Server",
        priority: 1,
        vendorPrefixes: ["com.my-iglu-server"],
        connection: {
          http: {
            uri: "http://awesome-schemas.my-iglu-server.com",
          },
        },
      },
    ],
  },
};

skiMask.validate(payload, resolverConfig).then(msg => console.log(msg));

// Will yield a result object

// {
//   success: true,
//   message: 'All Valid'
// }

// or

// {
//   success: false,
//   message: 'some error message',
//   context: 'some context for the error message'
// }

```
