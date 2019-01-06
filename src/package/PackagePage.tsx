import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PageWithBack from "../page/PageWithBack";
import { PackageConsumer } from "./PackageContext";
import PackageDetails from "./PackageDetails";

type PackagePageProps = RouteComponentProps & {
  match: {
    params: {
      pkgName: string;
    };
  };
};

const PackagePage = ({ match }: PackagePageProps) => (
  <PageWithBack>
    <PackageConsumer>
      {({ getPackage }) => (
        <PackageDetails pkg={getPackage(match.params.pkgName)} />
      )}
    </PackageConsumer>
  </PageWithBack>
);

export default withRouter(PackagePage);
