import { render } from "@jaredpalmer/after";
import express from "express";
import { join } from "path";
import React from "react";
import { CacheProvider } from "@emotion/core";
import { renderToString } from "react-dom/server";
import createEmotionServer from "create-emotion-server";
import createCache from "@emotion/cache";

import Document from "./Document";
import { routes } from "./routes";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const staticPath =
  process.env.NODE_ENV === "production"
    ? join(__dirname, "public")
    : process.env.RAZZLE_PUBLIC_DIR;

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(staticPath))
  .get("/*", async function routeHandler(req, res) {
    try {
      function customRenderer(node) {
        const cache = createCache();
        const { extractCritical } = createEmotionServer(cache);

        const App = <CacheProvider value={cache}>{node}</CacheProvider>;
        // { html, css, ids }
        return extractCritical(renderToString(App));
      }

      const html = await render({
        req,
        res,
        routes,
        assets,
        document: Document,
        customRenderer
      });

      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
