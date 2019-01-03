import React from "react";
import { Link } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";
import css from "./pageWithBack.module.css";

type PageProps = {
  children: any;
};

const PageWithBack = ({ children }: PageProps) => (
  <div className={css.component}>
    <div className={css.leftArea}>
      <Link to="/" className={css.backLink}>
        <ArrowBackIos fontSize="large" />
      </Link>
    </div>
    <div className={css.mainArea}>{children}</div>
  </div>
);

export default PageWithBack;
