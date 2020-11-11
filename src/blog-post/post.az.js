const settings = {
  bindings: [
    {
      authLevel: "anonymous",
      type: "httpTrigger",
      direction: "in",
      name: "req",
      route: "blog-post/{name}",
      methods: ["post"],
    },
    {
      type: "http",
      direction: "out",
      name: "$return",
    },
    {
      name: "outputBlob",
      type: "blob",
      path: "samples-workitems/{name}-Copy",
      connection: "AzureWebJobsStorage",
      direction: "out",
    },
  ],
};

const name = "blog-post_post";

const run = async (context, req, myOutputBlob) => ({
  body: { created: true },
});

module.exports = { settings, name, run };
