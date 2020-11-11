const settings = {
  bindings: [
    {
      authLevel: "anonymous",
      type: "httpTrigger",
      direction: "in",
      name: "req",
      route: "users",
      methods: ["get"],
    },
    {
      type: "http",
      direction: "out",
      name: "$return",
    },
  ],
};

const name = "user_get";

const run = async (context, req) => ({ body: { user: "I am a user" } });

module.exports = { settings, name, run };
