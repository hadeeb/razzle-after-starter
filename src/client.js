import After from "@jaredpalmer/after/after";
import { ensureReady } from "@jaredpalmer/after/ensureReady";
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/core";

import { routes } from "./routes";
import { withLayout } from "./layout";

const Page = withLayout(After);

const cache = createCache();

ensureReady(routes).then(data => {
  hydrate(
    <CacheProvider value={cache}>
      <BrowserRouter>
        <Page data={data} routes={routes} />
      </BrowserRouter>
    </CacheProvider>,
    document.getElementById("root")
  );
});

if (module.hot) {
  module.hot.accept();
}
