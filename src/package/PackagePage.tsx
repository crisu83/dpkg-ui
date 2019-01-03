import React from "react";
import { withRouter } from "react-router-dom";
import PageWithBack from "../page/PageWithBack";
import { PackageConsumer } from "./PackageContext";
import PackageDetails from "./PackageDetails";
import { arrayFind } from "../utils";
import { Package } from "../types";

type PackagePageProps = {
  match: any;
};

const PackagePage = ({ match }: PackagePageProps) => (
  <PageWithBack>
    <PackageConsumer>
      {(packages: Package[]) => (
        <PackageDetails
          pkg={arrayFind(
            packages,
            (pkg: Package) => pkg.name === match.params.packageName
          )}
        />
      )}
    </PackageConsumer>
  </PageWithBack>
);

export default withRouter(PackagePage);
