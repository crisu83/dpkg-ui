import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { PackageProvider } from "./package/PackageContext";
import readPackages from "./package/readPackages";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const statusFile = require("./resources/status.real");

const renderApp = async (Component: any) => {
  const packages = await readPackages(statusFile);

  ReactDOM.render(
    <PackageProvider value={packages}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </PackageProvider>,
    document.getElementById("root")
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept("./app/App", () => {
    const NextApp = require("./app/App").default;
    renderApp(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
