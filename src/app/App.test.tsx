import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import App from "./App";
import { PackageProvider } from "../package/PackageContext";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <PackageProvider value={[]}>
        <App />
      </PackageProvider>
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
