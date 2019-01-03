import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import css from "./packageList.module.css";

type PackageListProps = {
  heading: string;
  packageNames: string[];
};

const PackageList = ({ heading, packageNames }: PackageListProps) => (
  <div className={css.component}>
    <Typography variant="h5">{heading}</Typography>
    {packageNames.length ? (
      <ul className={css.list}>
        {packageNames.map((packageName, i) => (
          <li className={css.packageName} key={i}>
            <Link to={`/${packageName}`}>{packageName}</Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className={css.noneText}>None</p>
    )}
  </div>
);

export default PackageList;
