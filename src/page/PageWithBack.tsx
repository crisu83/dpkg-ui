import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";
import css from "./pageWithBack.module.css";

type PageProps = RouteComponentProps & {
  children?: any;
};

const PageWithBack = ({ history, children }: PageProps) => (
  <div className={css.component}>
    <aside>
      <a onClick={() => history.goBack()} className={css.backLink}>
        <ArrowBackIos fontSize="large" />
      </a>
    </aside>
    <main>{children}</main>
  </div>
);

export default withRouter(PageWithBack);
