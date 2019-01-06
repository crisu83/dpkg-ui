import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import css from "./packageList.module.css";

interface IDependentListProps {
  dependents: string[];
}

const DependentList = ({ dependents }: IDependentListProps) => (
  <div className={css.component}>
    <Typography variant="h5">Dependents</Typography>
    {dependents.length ? (
      <ul className={css.list}>
        {dependents.map(name => (
          <li className={css.packageName} key={name}>
            <Link to={`/${name}`}>{name}</Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className={css.noneText}>None</p>
    )}
  </div>
);

export default DependentList;
