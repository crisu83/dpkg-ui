import { arraySort, camelCase, inArray } from "../utils";
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

    return !inArray(dependencies, d => d.name === name)
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
    return {
      kind: NodeKind.Document,
      packages: arraySort(
        source.split("\n\n").map(this._parsePackage),
        (a, b) => a.package.value.localeCompare(b.package.value)
      )
    };
  };

  private _parsePackage = (source: string): IPackageNode => {
    const pattern = /^[\w\-]+: (?:.|\n\s)+$/gm;
    const fields = (source.match(pattern) || []).map(this._parseField);

    return {
      kind: NodeKind.Package,
      ...Object.values(FieldName).reduce(
        (
          data: { [fieldName: string]: IFieldNode<any> },
          fieldName: FieldName
        ) => {
          const field = fields.filter(f => f.name === FieldName[fieldName])[0];
          return field ? { [camelCase(fieldName)]: field, ...data } : data;
        },
        {}
      )
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
}
