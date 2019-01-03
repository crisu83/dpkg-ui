import React, { createContext } from "react";
import { Package } from "../types";

const PackageContext = createContext([]);

type PackageProviderProps = {
  packages: Package[];
  children: any;
};

export const PackageProvider = ({
  packages,
  children
}: PackageProviderProps) => (
  // @ts-ignore
  <PackageContext.Provider value={packages}>{children}</PackageContext.Provider>
);

export const PackageConsumer = PackageContext.Consumer;
