import * as http from "http";

let app = require("./server").default;

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`🚀 started on port ${port}`);
});

if (module.hot) {
  console.log("✅  Server-side HMR Enabled!");

  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");

    try {
      server.removeListener("request", app);
      app = require("./server").default;
      server.on("request", app);
    } catch (error) {
      console.error(error);
    }
  });
}
