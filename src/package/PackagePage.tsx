import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PageWithBack from "../page/PageWithBack";
import { PackageConsumer } from "./PackageContext";
import PackageDetails from "./PackageDetails";
import { arrayFind } from "../utils";

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
      {packages => (
        <PackageDetails
          pkg={arrayFind(packages, pkg => pkg.name === match.params.pkgName)}
        />
      )}
    </PackageConsumer>
  </PageWithBack>
);

export default withRouter(PackagePage);
