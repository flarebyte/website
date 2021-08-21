import { readFileSync, writeFileSync, PathLike } from "fs";
import { english } from "./english-data";
import { compile } from "handlebars";
import {Converter } from 'showdown'

const mdPath = 'generator/flarebyte/md'

const readFileSyncAsString = (path: PathLike) => readFileSync(path, "utf8");

const writeFileSyncAsString = (path: PathLike, content: string) =>
  writeFileSync(path, content, "utf8");

const readMdFileAsHtml = (path: PathLike): string => {
  const md = readFileSyncAsString(path)
  const converter = new Converter()
  return converter.makeHtml(md)
}

const generate = () => {
  const template = readFileSyncAsString("generator/flarebyte/main-page-template.hbs");
  const compiled = compile(template);
  const md = {
    architecture: readMdFileAsHtml(`${mdPath}/architecture.md`),
    contact: readMdFileAsHtml(`${mdPath}/contact.md`),
    project: readMdFileAsHtml(`${mdPath}/project.md`),
    webdev: readMdFileAsHtml(`${mdPath}/webdev.md`),
  }
  const englishAndMd = { ...english, ...md}
  const html = compiled(englishAndMd);
  writeFileSyncAsString('flarebyte_com/index2.html', html)
};

generate()