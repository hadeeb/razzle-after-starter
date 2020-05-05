if (process.env.NODE_ENV !== "production") {
  require("preact/debug");
} else {
  require("preact/devtools");
}
import "./index.css";
import { After, ensureReady } from "@jaredpalmer/after";
import * as React from "react";
import { hydrate } from "preact";
import { BrowserRouter } from "react-router-dom";

import { routes } from "./routes";

ensureReady(routes).then((data) => {
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} />
    </BrowserRouter>,
    document.getElementById("root")
  );
});

if (module.hot) {
  module.hot.accept();
}
