import { camelCase } from "../utils";
import {
  FieldName,
  IDocumentNode,
  IFieldNode,
  IPackageNode,
  NodeKind
} from "./ast";

type ParseFn = (value: string) => any;

export const dependencyParser: ParseFn = value =>
  value
    .split(", ")
    .map(dependency => dependency.split(" ")[0])
    .filter((name, i, a) => a.indexOf(name) === i);

const fieldValueParsers: { [key: string]: ParseFn } = {
  Depends: dependencyParser
};

export default class Parser {
  public parse = (source: string): IDocumentNode => {
    const packages = source.split("\n\n").map(this.parsePackage);
    packages.sort((a, b) => {
      return a.package && b.package
        ? a.package.value.localeCompare(b.package.value)
        : 0;
    });
    return {
      kind: NodeKind.Document,
      packages
    };
  };

  private parsePackage = (source: string): IPackageNode => {
    const pattern = /^[\w\-]+: (?:.|\n\s)+$/gm;
    const fieldData = (source.match(pattern) || []).map(this.parseField);
    const fieldReducer = (
      data: { [key: string]: IFieldNode },
      fieldName: string
    ) => {
      // @ts-ignore
      const field = this.findField(FieldName[fieldName], fieldData);
      return field ? { [camelCase(fieldName)]: field, ...data } : data;
    };
    const fields = Object.values(FieldName).reduce(fieldReducer, {});

    // @ts-ignore
    return {
      kind: NodeKind.Package,
      ...fields
    };
  };

  private parseField = (source: string): IFieldNode => {
    const [fieldName, fieldValue] = source.split(": ");
    const parseFn = fieldValueParsers[fieldName];
    return {
      kind: NodeKind.Field,
      name: fieldName,
      value: parseFn ? parseFn(fieldValue) : fieldValue
    };
  };

  private findField = (fieldName: FieldName, fields: IFieldNode[]) => {
    return (fields.filter(field => field.name === fieldName) || [])[0];
  };
}
