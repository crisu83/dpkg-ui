import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PageWithBack from "../page/PageWithBack";
import { PackageConsumer } from "./PackageContext";
import PackageDetails from "./PackageDetails";
import { arrayFind } from "../utils";
import { Package } from "../types";

type PackagePageProps = {
  match: {
    params: {
      pkgName: string;
    };
  };
} & RouteComponentProps;

const PackagePage = ({ match }: PackagePageProps) => (
  <PageWithBack>
    <PackageConsumer>
      {(packages: Package[]) => (
        <PackageDetails
          pkg={arrayFind(
            packages,
            (pkg: Package) => pkg.name === match.params.pkgName
          )}
        />
      )}
    </PackageConsumer>
  </PageWithBack>
);

export default withRouter(PackagePage);
