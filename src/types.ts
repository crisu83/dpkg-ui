export type Dependency = {
  name: string;
  alternates: string[];
};

export type Package = {
  name: string;
  description: string;
  dependencies: Dependency[];
  dependents: string[];
};
