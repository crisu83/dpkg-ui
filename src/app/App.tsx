import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../home/HomePage";
import PackagePage from "../package/PackagePage";
import NotFoundPage from "../notFound/NotFoundPage";
import css from "./App.module.css";

type AppProps = {};

const App = ({  }: AppProps) => (
  <div className={css.component}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/404" component={NotFoundPage} />
      <Route path="/:pkgName" component={PackagePage} />
      <Redirect from="*" to="/404" />
    </Switch>
  </div>
);

export default App;
