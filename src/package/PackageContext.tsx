import { createContext } from "react";
import { Package } from "../types";

export const {
  Provider: PackageProvider,
  Consumer: PackageConsumer
} = createContext<Package[]>([]);
