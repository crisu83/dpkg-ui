import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PageWithBack from "../page/PageWithBack";
import PackageDetails from "./PackageDetails";
import withPackages from "../hoc/withPackages";
import { Package } from "../types";

type PackagePageProps = RouteComponentProps & {
  match: {
    params: {
      pkgName: string;
    };
  };
  getPackage: (pkgName: string) => Package | null;
};

const PackagePage = ({ match, getPackage }: PackagePageProps) => (
  <PageWithBack>
    <PackageDetails
      pkg={getPackage(match.params.pkgName)}
      key={match.params.pkgName}
    />
  </PageWithBack>
);

export default withRouter(withPackages(PackagePage));
