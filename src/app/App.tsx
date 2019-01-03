import React, { PureComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PackagePage from "../package/PackagePage";
import { Package } from "../types";
import css from "./App.module.css";
import { PackageProvider } from "../package/PackageContext";
import HomePage from "../home/HomePage";

type AppProps = {
  packages: Package[];
};

const App = ({ packages }: AppProps) => (
  <div className={css.component}>
    <BrowserRouter>
      <PackageProvider packages={packages}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:packageName" component={PackagePage} />
        </Switch>
      </PackageProvider>
    </BrowserRouter>
  </div>
);

export default App;
