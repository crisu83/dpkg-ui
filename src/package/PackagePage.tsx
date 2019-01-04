import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PageWithBack from "../page/PageWithBack";
import PackageDetails from "./PackageDetails";
import usePackages from "../hooks/usePackages";
import { Package } from "../types";

interface IPackagePageProps {
  match: {
    params: {
      pkgName: string;
    };
  };
  getPackage: (pkgName: string) => Package | null;
}

const PackagePage = ({ match }: RouteComponentProps & IPackagePageProps) => {
  const { getPackage } = usePackages();

  return (
    <PageWithBack>
      <PackageDetails
        pkg={getPackage(match.params.pkgName)}
        key={match.params.pkgName}
      />
    </PageWithBack>
  );
};

export default withRouter(PackagePage);
