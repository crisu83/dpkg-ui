import React from "react";
import { withRouter, Link } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";
import PageWithBack from "../page/PageWithBack";
import { PackageConsumer } from "./PackageContext";
import PackageDetails from "./PackageDetails";
import { findPackage } from "../utils";
import { Package } from "../types";

type PackagePageProps = {
  match: any;
};

const PackagePage = ({ match }: PackagePageProps) => (
  <PageWithBack>
    <PackageConsumer>
      {(packages: Package[]) => (
        <PackageDetails pkg={findPackage(match.params.packageName, packages)} />
      )}
    </PackageConsumer>
  </PageWithBack>
);

export default withRouter(PackagePage);
