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
  package: IFieldNode;
  // status: IFieldNode;
  // multiArch: IFieldNode;
  // priority: IFieldNode;
  // section: IFieldNode;
  // installedSize: IFieldNode;
  // maintainer: IFieldNode;
  // architecture: IFieldNode;
  // source: IFieldNode;
  // version: IFieldNode;
  // replaces: IFieldNode;
  // breaks: IFieldNode;
  // provides: IFieldNode;
  depends: IFieldNode;
  // suggests: IFieldNode;
  // conflicts: IFieldNode;
  description: IFieldNode;
  // originalMaintainer: IFieldNode;
  // homepage: IFieldNode;
}

export enum FieldName {
  Package = "Package",
  // Status = "Status",
  // MultiArch = "Multi-Arch",
  // Priority = "Priority",
  // Section = "Section",
  // InstalledSize = "Installed-Size",
  // Maintainer = "Maintainer",
  // Architecture = "Architecture",
  // Source = "Source",
  // Version = "Version",
  // Replaces = "Replaces",
  // Breaks = "Breaks",
  // Provides = "Provides",
  Depends = "Depends",
  // Suggests = "Suggests",
  // Conflicts = "Conflicts",
  Description = "Description"
  // OriginalMaintainer = "Original-Maintainer",
  // Homepage = "Homepage"
}

export interface IFieldNode extends INode {
  name: string;
  value: any;
}
