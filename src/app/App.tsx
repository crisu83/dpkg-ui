import React, { PureComponent } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PackageProvider } from "../package/PackageContext";
import HomePage from "../home/HomePage";
import PackagePage from "../package/PackagePage";
import NotFoundPage from "../notFound/NotFoundPage";
import { Package } from "../types";
import css from "./App.module.css";

type AppProps = {
  packages: Package[];
};

const App = ({ packages }: AppProps) => (
  <div className={css.component}>
    <BrowserRouter>
      <PackageProvider packages={packages}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/404" component={NotFoundPage} />
          <Route path="/:packageName" component={PackagePage} />
          <Redirect from="*" to="/404" />
        </Switch>
      </PackageProvider>
    </BrowserRouter>
  </div>
);

export default App;
