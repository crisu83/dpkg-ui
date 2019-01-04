import React from "react";
import { withRouter } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";
import css from "./pageWithBack.module.css";

type PageProps = {
  history: any;
  children?: any;
};

const PageWithBack = ({ history, children }: PageProps) => (
  <div className={css.component}>
    <div className={css.leftArea}>
      <a onClick={() => history.goBack()} className={css.backLink}>
        <ArrowBackIos fontSize="large" />
      </a>
    </div>
    <div className={css.mainArea}>{children}</div>
  </div>
);

export default withRouter(PageWithBack);
