import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Dependency } from "../types";
import css from "./packageList.module.css";

type DependencyListProps = {
  dependencies: Dependency[];
};

const DependencyList = ({ dependencies }: DependencyListProps) => (
  <div className={css.component}>
    <Typography variant="h5">Dependencies</Typography>
    {dependencies.length ? (
      <ul className={css.list}>
        {dependencies.map(({ name, alternates }) => (
          <li className={css.packageName} key={name}>
            <Link to={`/${name}`}>{name}</Link>
            {alternates.length > 0 && " | " + alternates.join(" | ")}
          </li>
        ))}
      </ul>
    ) : (
      <p className={css.noneText}>None</p>
    )}
  </div>
);

export default DependencyList;
