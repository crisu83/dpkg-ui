export enum NodeKind {
  Document = "Document",
  Package = "Package",
  Field = "Field"
}

export interface INode {
  kind: NodeKind;
}

export interface IDocumentNode extends INode {
  packages: IPackageNode[];
}

export interface IPackageNode extends INode {
  package: IFieldNode<string>;
  depends: IFieldNode<IDependency[]>;
  description: IFieldNode<string>;
}

export enum FieldName {
  Package = "Package",
  Depends = "Depends",
  Description = "Description"
}

export interface IFieldNode<Value> extends INode {
  name: string;
  value: Value;
}

export interface IDependency {
  name: string;
  alternates: string[];
}
