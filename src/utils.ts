import { IPackageNode } from "./parser/ast";
import { Package } from "./types";
import Parser from "./parser/parser";

export const camelCase = (value: string): string =>
  value[0].toLowerCase() + value.substr(1);

export const arrayFind = (
  array: any[],
  comparatorFn: (obj: any) => boolean
): any => (array.filter(comparatorFn) || [])[0];

export const inArray = (
  array: any[],
  comparatorFn: (obj: any) => boolean
): boolean => array.filter(comparatorFn).length > 0;

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
    .filter(pkg =>
      inArray(pkg.dependencies, dependency => dependency.name === parent.name)
    )
    .map(dependent => dependent.name);

export const normalizePackage = (node: IPackageNode): Package => ({
  name: node.package ? node.package.value : "",
  description: node.description ? node.description.value : "",
  dependencies: node.depends ? node.depends.value : [],
  dependents: []
});
