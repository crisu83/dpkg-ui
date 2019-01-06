import React from "react";
import { PackageConsumer } from "../package/PackageContext";

const withPackages = (WrappedComponent: any): any => (props: any) => (
  <PackageConsumer>
    {({ packages, getPackage }) => (
      <WrappedComponent
        {...props}
        packages={packages}
        getPackage={getPackage}
      />
    )}
  </PackageConsumer>
);

export default withPackages;
