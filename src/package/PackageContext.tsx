import { createContext } from "react";
import { Package } from "../types";

const PackageContext = createContext<Package[]>([]);

export const {
  Provider: PackageProvider,
  Consumer: PackageConsumer
} = PackageContext;

export default PackageContext;
