import { createContext } from "react";
import { Package } from "../types";

interface IPackageContext {
  packages: Package[];
  getPackage: (pkgName: string) => Package | null;
}

const defaultValue = { packages: [], getPackage: () => null };

const PackageContext = createContext<IPackageContext>(defaultValue);

export const {
  Provider: PackageProvider,
  Consumer: PackageConsumer
} = PackageContext;

export default PackageContext;
