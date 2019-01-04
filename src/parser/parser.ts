import { camelCase, inArray } from "../utils";
import {
  FieldName,
  IDocumentNode,
  IFieldNode,
  IPackageNode,
  NodeKind,
  IDependency
} from "./ast";

type ParseFn = (value: string) => any;

export const dependencyParser: ParseFn = value => {
  return value
    .split(", ")
    .reduce((dependencies: IDependency[], current: string): IDependency[] => {
      const [name, ...alternates] = (current.split(" | ") || [current]).map(
        part => part.split(" ")[0]
      );

      return !inArray(
        dependencies,
        (dependency: IDependency) => dependency.name === name
      )
        ? [...dependencies, { name, alternates }]
        : dependencies;
    }, []);
};

const fieldValueParsers: { [key: string]: ParseFn } = {
  Depends: dependencyParser
};

export default class Parser {
  public parse = (source: string): IDocumentNode => {
    const packages = source.split("\n\n").map(this.parsePackage);
    packages.sort((a, b) => a.package.value.localeCompare(b.package.value));
    return {
      kind: NodeKind.Document,
      packages
    };
  };

  private parsePackage = (source: string): IPackageNode => {
    const pattern = /^[\w\-]+: (?:.|\n\s)+$/gm;
    const fieldData = (source.match(pattern) || []).map(this.parseField);
    const fieldReducer = (
      data: { [key: string]: IFieldNode<any> },
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

  private parseField = (source: string): IFieldNode<any> => {
    const [fieldName, fieldValue] = source.split(": ");
    const parseFn = fieldValueParsers[fieldName];
    return {
      kind: NodeKind.Field,
      name: fieldName,
      value: parseFn ? parseFn(fieldValue) : fieldValue
    };
  };

  private findField = (
    fieldName: FieldName,
    fields: Array<IFieldNode<any>>
  ) => {
    return (fields.filter(field => field.name === fieldName) || [])[0];
  };
}
