import { IPackageNode } from "./parser/ast";
import { Package } from "./types";
import Parser from "./parser/parser";

export const camelCase = (value: string): string =>
  value[0].toLowerCase() + value.substr(1);

export const loadPackages = async (): Promise<Package[]> => {
  const statusFile = require("./resources/status.real");
  const response = await fetch(statusFile);
  const source = await response.text();
  const data = new Parser().parse(source).packages.map(normalizePackage);
  return data.map(pkg => ({
    ...pkg,
    dependents: buildDependents(pkg, data)
  }));
};

export const buildDependents = (
  parent: Package,
  packages: Package[]
): string[] =>
  packages
    .filter(pkg => pkg.dependencies.indexOf(parent.name) !== -1)
    .map(dependent => dependent.name);

export const normalizePackage = (node: IPackageNode): Package => ({
  name: node.package ? node.package.value : "",
  description: node.description ? node.description.value : "",
  dependencies: node.depends ? node.depends.value : [],
  dependents: []
});

export const findPackage = (
  packageName: string,
  packages: Package[]
): Package => (packages.filter(pkg => pkg.name === packageName) || [])[0];
