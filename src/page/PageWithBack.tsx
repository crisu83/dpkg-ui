import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";
import css from "./pageWithBack.module.css";

interface IPageProps {
  children?: any;
}

const PageWithBack = ({
  history,
  children
}: RouteComponentProps & IPageProps) => (
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
