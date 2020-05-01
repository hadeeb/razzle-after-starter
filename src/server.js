import { render } from "@jaredpalmer/after";
import * as express from "express";
import * as path from "path";

import Document from "./Document";
import { routes } from "./routes";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const staticPath =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "public")
    : process.env.RAZZLE_PUBLIC_DIR;

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(staticPath))
  .get("/*", async function routeHandler(req, res) {
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        chunks,
        document: Document,
      });

      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
