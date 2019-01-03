import React, { PureComponent } from "react";
import PackagePage from "../package/PackagePage";
import { Package } from "../types";
import css from "./App.module.css";

type AppProps = {
  packages: Package[];
};

class App extends PureComponent<AppProps> {
  render() {
    const { packages } = this.props;

    return (
      <div className={css.component}>
        <PackagePage packages={packages} />
      </div>
    );
  }
}

export default App;
