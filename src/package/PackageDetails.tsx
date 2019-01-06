import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";
import DependencyList from "./DependencyList";
import DependentList from "./DependentList";
import { Package } from "../types";
import css from "./packageDetails.module.css";
import useScrollToTop from "../hooks/useScrollToTop";

interface IPackageDetailsProps {
  pkg: Package | null;
}

const PackageDetails = ({ pkg }: IPackageDetailsProps) => {
  if (!pkg) {
    return <Redirect to="/404" />;
  }

  const { name, description, dependencies, dependents } = pkg;

  useScrollToTop([name]);

  return (
    <article>
      <Typography gutterBottom variant="h2">
        {name}
      </Typography>
      <div className={css.descriptionText}>
        {description.split("\n").map((line, i) => (
          <Fragment key={i}>
            {line}
            <br />
          </Fragment>
        ))}
      </div>
      <DependencyList dependencies={dependencies} />
      <DependentList dependents={dependents} />
    </article>
  );
};

export default PackageDetails;
