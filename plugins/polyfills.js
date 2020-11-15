const path = require("path");

module.exports = {
  /**@param {{webpackConfig:import("webpack").Configuration}} param0 */
  modifyWebpackConfig({ webpackConfig: config, env: { target } }) {
    if (target === "web") {
      config.entry = {
        ...config.entry,
        polyfills: require.resolve("@next/polyfill-nomodule"),
      };
      config.output.filename = config.output.filename.replace(
        "bundle",
        "[name]"
      );

      const stubWindowFetch = path.join(__dirname, "stubs", "fetch.js");
      const stubObjectAssign = path.join(
        __dirname,
        "stubs",
        "object-assign.js"
      );

      config.resolve.alias = {
        ...config.resolve.alias,
        unfetch$: stubWindowFetch,
        "isomorphic-unfetch$": stubWindowFetch,
        "object-assign$": stubObjectAssign,
      };
    }

    return config;
  },
};
