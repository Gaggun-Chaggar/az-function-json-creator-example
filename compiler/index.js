const fs = require("fs");
const glob = require("glob");

const getSettings = (fileString) => {
  const settingsMatch = fileString.match(
    /settings\s*=\s*(?<binding>\{([\s\S\n])+\})/
  );
  console.log(settingsMatch);

  if (!settingsMatch) {
    console.error(`${f} is missing settings option`);
    process.exit(1);
  }
  const bindingGroup = settingsMatch.groups.binding;

  let bracket = 1;
  let i = 1;
  for (let length = bindingGroup.length; i < length; i++) {
    const char = bindingGroup.charAt(i);
    switch (char) {
      case "{":
        bracket++;
        break;
      case "[":
        bracket++;
        break;
      case "}":
        bracket--;
        break;
      case "]":
        bracket--;
        break;
    }
    if (bracket === 0) break;
  }

  const settings = bindingGroup.substring(0, i + 1);

  console.log("settings: " + settings);

  return new Function(`return ${settings};`)();
};

const getName = (fileString) => {
  const nameMatch = fileString.match(/name\s*=\s*(?<name>[\S]*)/g);
  if (!nameMatch || nameMatch.length == 0) {
    console.error(`${f} is missing name option`);
    process.exit(1);
  }
  const name = new Function(
    `return ${nameMatch.length > 1 ? nameMatch[1] : nameMatch[0]}`
  )();

  console.log("folder name: " + name);

  return name;
};

const compile = async (globExpr) => {
  glob(globExpr, null, (er, files) => {
    for (const f of files) {
      const mod = fs.readFileSync(f, "utf-8");
      console.log(mod);

      const bindings = getSettings(mod);

      const name = getName(mod);

      bindings.scriptFile = "../" + f;

      const fnjson = JSON.stringify(bindings, null, 4);

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
