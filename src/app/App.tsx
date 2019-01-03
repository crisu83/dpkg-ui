import React, { PureComponent } from "react";
import { Package } from "../types";
import css from "./App.module.css";

type AppProps = {
  packages: Package[];
};

class App extends PureComponent<AppProps> {
  render() {
    const { packages } = this.props;

    return <div className={css.component}>Hello from React!</div>;
  }
}

export default App;
