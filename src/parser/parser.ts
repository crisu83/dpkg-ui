import { camelCase, inArray } from "../utils";
import {
  FieldName,
  IDocumentNode,
  IFieldNode,
  IPackageNode,
  NodeKind,
  IDependency
} from "./ast";

type ParseFn<ParsedValue> = (value: string) => ParsedValue;

export const dependencyParser: ParseFn<IDependency[]> = value => {
  const dependencyReducer = (
    dependencies: IDependency[],
    current: string
  ): IDependency[] => {
    const [name, ...alternates] = (current.split(" | ") || [current]).map(
      part => part.split(" ")[0]
    );

    return !inArray(
      dependencies,
      (dependency: IDependency) => dependency.name === name
    )
      ? [...dependencies, { name, alternates }]
      : dependencies;
  };

  return value.split(", ").reduce(dependencyReducer, []);
};

const fieldValueParsers: { [fieldName: string]: ParseFn<any> } = {
  Depends: dependencyParser
};

export default class Parser {
  public parse = (source: string): IDocumentNode => {
    const packages = source.split("\n\n").map(this._parsePackage);

    packages.sort((a, b) => a.package.value.localeCompare(b.package.value));

    return {
      kind: NodeKind.Document,
      packages
    };
  };

  private _parsePackage = (source: string): IPackageNode => {
    const pattern = /^[\w\-]+: (?:.|\n\s)+$/gm;
    const fieldData = (source.match(pattern) || []).map(this._parseField);
    const fieldReducer = (
      data: { [fieldName: string]: IFieldNode<any> },
      fieldName: FieldName
    ) => {
      const field = this._findField(FieldName[fieldName], fieldData);

      return field ? { [camelCase(fieldName)]: field, ...data } : data;
    };

    return {
      kind: NodeKind.Package,
      ...Object.values(FieldName).reduce(fieldReducer, {})
    };
  };

  private _parseField = (source: string): IFieldNode<any> => {
    const [fieldName, fieldValue] = source.split(": ");
    const parseFn = fieldValueParsers[fieldName];

    return {
      kind: NodeKind.Field,
      name: fieldName,
      value: parseFn ? parseFn(fieldValue) : fieldValue
    };
  };

  private _findField = (fieldName: FieldName, fields: Array<IFieldNode<any>>) =>
    (fields.filter(field => field.name === fieldName) || [])[0];
}
