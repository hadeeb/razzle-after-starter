const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const argv = require("yargs").argv;

module.exports = (defaultConfig, { target, dev }) => {
  const config = Object.assign({}, defaultConfig);
  if (target === "web" && !dev && argv.stats) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
