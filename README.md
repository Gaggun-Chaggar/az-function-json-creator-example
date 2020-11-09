# Azure Functions - `function.json` Creator.

This project is a POC for a compiler which produces the required root directory and `function.json` file for Azure functions.
`compiler/index.js` looks for files ending in `.az.js` in the `src` folder, and then creates a new folder in the project root with a `function.json` file.
The `function.json` file will also include the `scriptFile` property to point to the `.az.js` file.
With this, Azure Functions can be defined anywhere in the `src` folder and the binding data and function are in a single file, rather than requiring folders with an index.js and function.json in the root, or manually updating scriptFile properties.

## `az.js` Files

`az.js` should export:

- `settings` - which contains the data to be placed in the generated `function.json`. The `scriptFile` option is not required, this will be added automatically.
- `run` or `index` - which is equal to the function to run, as per Azure Functions requirements.
- (optional) `name` - the name to use for the generated folder, if this is not exported, then the file name name will be used.

### Example

```javascript
const settings = {
  bindings: [
    {
      authLevel: "anonymous",
      type: "httpTrigger",
      direction: "in",
      name: "req",
      route: "hello1",
      methods: ["get"],
    },
    {
      type: "http",
      direction: "out",
      name: "$return",
    },
  ],
};

const name = "example_get";

const run = async (context, req) => ({ body: "hello world" });

module.exports = { settings, name, run };
```

## Updating for TypeScript

The same compiler file can be used for TypeScript by updating the glob pattern in the `compiler/index.js` file to the output directory of your typescript build.

For typescript, it is also useful to add the following scripts to the `package.json` file:

```json
  "scripts": {
    "rm-dist": "rm -r dist",
    "ts-build": "tsc",
    "ts-watch": "tsc-w",
    "fn-compile": "node compiler/index.js",
    "build": "npm run ts-build && npm run fn-compile",
    "prepare": "npm run build",
    "start": "func host start"
  }
```
