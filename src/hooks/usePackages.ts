import { useContext } from "react";
import PackageContext from "../package/PackageContext";
import { arrayFind } from "../utils";

const usePackages = () => {
  const packages = useContext(PackageContext);

  const getPackage = (pkgName: string) =>
    arrayFind(packages, pkg => pkg.name === pkgName);

  return { packages, getPackage };
};

export default usePackages;
