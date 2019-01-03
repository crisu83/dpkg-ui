import React from "react";
import ReactDOM from "react-dom";
import Parser from "./parser/parser";
import { normalizePackage, loadPackages } from "./utils";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const renderApp = async () => {
  const packages = await loadPackages();

  ReactDOM.render(<App packages={packages} />, document.getElementById("root"));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
};

renderApp();
