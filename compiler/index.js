const fs = require("fs");
const glob = require("glob");
const compile = async (globExpr) => {
  glob(globExpr, null, (er, files) => {
    for (const f of files) {
      const mod = require("../" + f);
      mod.settings.scriptFile = "../" + f;

      const fnjson = JSON.stringify(
        typeof mod.settings === "function" ? mod.settings() : mod.settings,
        null,
        4
      );

      const name = mod.name || f.split("/").pop().replace(".az.js", "");

      fs.promises.mkdir(`${name}`, { recursive: true }).then(() => {
        fs.writeFileSync(
          `${name}/function.json`,
          new Uint8Array(Buffer.from(fnjson))
        );
      });
    }
  });
};

compile("src/**/*.az.js");
