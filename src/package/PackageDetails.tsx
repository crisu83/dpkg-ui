import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";
import DependencyList from "./DependencyList";
import DependentList from "./DependentList";
import { Package } from "../types";
import css from "./packageDetails.module.css";
import scrollToTop from "../hoc/scrollToTop";

type PackageDetailsProps = {
  pkg: Package | null;
};

const PackageDetails = ({ pkg }: PackageDetailsProps) =>
  pkg ? (
    <article>
      <Typography gutterBottom variant="h2">
        {pkg.name}
      </Typography>
      <div className={css.descriptionText}>
        {pkg.description.split("\n").map((line, i) => (
          <Fragment key={i}>
            {line}
            <br />
          </Fragment>
        ))}
      </div>
      <DependencyList dependencies={pkg.dependencies} />
      <DependentList dependents={pkg.dependents} />
    </article>
  ) : (
    <Redirect to="/404" />
  );

export default scrollToTop(PackageDetails);
