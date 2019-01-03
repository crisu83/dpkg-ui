import React from "react";
import { withRouter, Link } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";
import { PackageConsumer } from "./PackageContext";
import PackageDetails from "./PackageDetails";
import { findPackage } from "../utils";
import { Package } from "../types";
import css from "./packagePage.module.css";

type PackagePageProps = {
  match: any;
};

const PackagePage = ({ match }: PackagePageProps) => (
  <div className={css.component}>
    <div>
      <Link to="/" className={css.backLink}>
        <ArrowBackIos fontSize="large" />
      </Link>
    </div>
    <PackageConsumer>
      {(packages: Package[]) => (
        <PackageDetails pkg={findPackage(match.params.packageName, packages)} />
      )}
    </PackageConsumer>
  </div>
);

export default withRouter(PackagePage);
