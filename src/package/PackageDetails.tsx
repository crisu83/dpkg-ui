import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import PackageList from "./PackageList";
import { Package } from "../types";
import css from "./packageDetails.module.css";

type PackageDetailsProps = {
  pkg: Package;
};

const PackageDetails = ({ pkg }: PackageDetailsProps) => (
  <div>
    <Typography gutterBottom variant="h2">
      {pkg.name}
    </Typography>
    <div className={css.descriptionText}>
      {pkg.description.split("\n").map((line: string, i: number) => (
        <Fragment key={i}>
          {line}
          <br />
        </Fragment>
      ))}
    </div>
    <PackageList heading="Dependencies" packageNames={pkg.dependencies} />
    <PackageList heading="Dependents" packageNames={pkg.dependents} />
  </div>
);

export default PackageDetails;
