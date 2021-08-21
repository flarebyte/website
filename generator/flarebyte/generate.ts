import { readFileSync, writeFileSync, PathLike } from "fs";
import { english } from "./english-data";
import { compile } from "handlebars";
import { Converter } from "showdown";
import { french } from "./french-data";

const mdPath = "generator/flarebyte/md";

const readFileSyncAsString = (path: PathLike) => readFileSync(path, "utf8");

const writeFileSyncAsString = (path: PathLike, content: string) =>
  writeFileSync(path, content, "utf8");

const readMdFileAsHtml = (path: PathLike): string => {
  const md = readFileSyncAsString(path);
  const converter = new Converter();
  return converter.makeHtml(md);
};

const generate = (language: "english" | "french", metadata: object) => {
  const template = readFileSyncAsString(
    "generator/flarebyte/main-page-template.hbs"
  );
  const compiled = compile(template);
  const md = {
    servicesInfo: readMdFileAsHtml(`${mdPath}/${language}/services-info.md`),
    contact: readMdFileAsHtml(`${mdPath}/${language}/contact.md`),
    isEnglish: language === 'english'
  };
  const metaAndMd = { ...metadata, ...md };
  const html = compiled(metaAndMd);
  const langFolder =
    language === "english" ? "flarebyte_com" : "flarebyte_com/fr";
  writeFileSyncAsString(`${langFolder}/index.html`, html);
};

generate("english", english);
generate("french", french);
