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
import usePackages from "../hooks/usePackages";
import css from "./homePage.module.css";

const HomePage = () => {
  const { packages } = usePackages();

  return (
    <main>
      <Typography gutterBottom variant="h2">
        Debian Packages
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center"># Dependencies</TableCell>
            <TableCell align="center"># Dependents</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map(pkg => (
            <TableRow className={css.tableRow} key={pkg.name}>
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
    </main>
  );
};

export default HomePage;
