import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  TableHead
} from "@material-ui/core";
import withPackages from "../hoc/withPackages";
import { Package } from "../types";
import css from "./homePage.module.css";

type HomePageProps = {
  packages: Package[];
};

const HomePage = ({ packages }: HomePageProps) => (
  <div className={css.component}>
    <Typography gutterBottom variant="h2">
      Debian Packages
    </Typography>
    <Table className={css.table}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="center"># Dependencies</TableCell>
          <TableCell align="center"># Dependents</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {packages.map((pkg, i) => (
          <TableRow className={css.tableRow} key={i}>
            <TableCell>
              <Link to={`/${pkg.name}`}>{pkg.name}</Link>
            </TableCell>
            <TableCell align="center" className={css.numericCell}>
              {pkg.dependencies.length}
            </TableCell>
            <TableCell align="center" className={css.numericCell}>
              {pkg.dependents.length}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default withPackages(HomePage);
