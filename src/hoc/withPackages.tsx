import React from "react";
import { PackageConsumer } from "../package/PackageContext";
import { arrayFind } from "../utils";

const withPackages = (WrappedComponent: any): any => (props: any) => (
  <PackageConsumer>
    {packages => (
      <WrappedComponent
        {...props}
        packages={packages}
        getPackage={(pkgName: string) =>
          arrayFind(packages, p => p.name === pkgName)
        }
      />
    )}
  </PackageConsumer>
);

export default withPackages;
