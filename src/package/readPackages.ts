import { inArray } from "../utils";
import Parser from "../parser/parser";
import { Package } from "../types";
import { IPackageNode } from "../parser/ast";

const readPackages = async (statusFile: string): Promise<Package[]> => {
  const response = await fetch(statusFile);
  const source = await response.text();
  const ast = new Parser().parse(source);

  const nodeToPackage = (node: IPackageNode): Package => ({
    name: node.package ? node.package.value : "",
    description: node.description ? node.description.value : "",
    dependencies: node.depends ? node.depends.value : [],
    dependents: []
  });

  return ast.packages.map(nodeToPackage).map((pkg, _, packages) => ({
    ...pkg,
    dependents: packages
      .filter(p => inArray(p.dependencies, d => d.name === p.name))
      .map(dependent => dependent.name)
  }));
};

export default readPackages;
