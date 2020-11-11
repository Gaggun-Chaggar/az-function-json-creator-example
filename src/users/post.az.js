const settings = {
  bindings: [
    {
      authLevel: "anonymous",
      type: "httpTrigger",
      direction: "in",
      name: "req",
      route: "users",
      methods: ["post"],
    },
    {
      type: "http",
      direction: "out",
      name: "$return",
    },
  ],
};

const name = "user_post";

const run = async (context, req) => ({ body: { created: true } });

module.exports = { settings, name, run };
