const settings = {
  bindings: [
    {
      authLevel: "anonymous",
      type: "httpTrigger",
      direction: "in",
      name: "req",
      route: "blog-post",
      methods: ["delete"],
    },
    {
      type: "http",
      direction: "out",
      name: "$return",
    },
  ],
};

const name = "blog-post_delete";

const run = async (context, req) => ({ status: 204 });

module.exports = { settings, name, run };
