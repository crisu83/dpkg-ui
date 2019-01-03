import React, { PureComponent } from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Package } from "../types";
import css from "./packagePage.module.css";

type PackagePageProps = {
  packages: Package[];
};

export default class PackagePage extends PureComponent<PackagePageProps> {
  render() {
    const { packages } = this.props;

    return (
      <div className={css.component}>
        <Typography gutterBottom variant="h2">
          Packages
        </Typography>
        <Table className={css.table}>
          <TableBody>
            {packages.map((pkg, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className={css.cellText}>{pkg.name}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
