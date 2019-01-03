import { IPackageNode } from "./parser/ast";
import { Package } from "./types";

export const camelCase = (value: string): string =>
  value[0].toLowerCase() + value.substr(1);

export const normalizePackage = (node: IPackageNode): Package => ({
  name: node.package ? node.package.value : "<unknown>",
  description: node.description ? node.description.value : "",
  depends: node.depends ? node.depends.value : []
});
