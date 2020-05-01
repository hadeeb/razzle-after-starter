const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const argv = require("yargs").argv;

module.exports = (config, { target, dev }) => {
  if (target === "web" && !dev && argv.stats) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
