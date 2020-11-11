const settings = {
  bindings: [
    {
      authLevel: "anonymous",
      type: "httpTrigger",
      direction: "in",
      name: "req",
      route: "blog-post",
      methods: ["get"],
    },
    {
      type: "http",
      direction: "out",
      name: "$return",
    },
  ],
};

const name = "blog-post_get";

const run = async (context, req) => ({ body: { blog: "Hello World!" } });

module.exports = { settings, name, run };
