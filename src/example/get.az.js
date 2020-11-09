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
