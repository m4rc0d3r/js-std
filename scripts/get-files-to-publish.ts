import path from "node:path";

import Arborist from "@npmcli/arborist";
import packlist from "npm-packlist";

import { isEntryPoint } from "./utils";

type Config = {
  packageRootDirectory: string;
};

async function getFilesToPublish({ packageRootDirectory }: Config) {
  return packlist(
    await new Arborist({
      path: packageRootDirectory,
    }).loadActual(),
  );
}

if (isEntryPoint(import.meta.filename)) {
  console.log(
    (
      await getFilesToPublish({
        packageRootDirectory: path.join(import.meta.dirname, ".."),
      })
    ).join("\n"),
  );
}

export { getFilesToPublish };
