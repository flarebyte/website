import { readFileSync, writeFileSync, PathLike } from "fs";
import { english } from "./english-data";
import { compile } from "handlebars";

const readFileSyncAsString = (path: PathLike) => readFileSync(path, "utf8");

const writeFileSyncAsString = (path: PathLike, content: string) =>
  writeFileSync(path, content, "utf8");

const generate = () => {
  const template = readFileSyncAsString("generator/flarebyte/main-page-template.hbs");
  const compiled = compile(template);
  const html = compiled(english);
  writeFileSyncAsString('flarebyte_com/index2.html', html)
};

generate()