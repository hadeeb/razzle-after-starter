const getBabelPreset = require("./plugins/babel");
const polyfills = require("./plugins/polyfills");
const bundleAnalyzerPlugin = require("./plugins/bundleAnalyzer");
const treatPlugin = require("./plugins/treat");

module.exports = {
  plugins: [polyfills, bundleAnalyzerPlugin, treatPlugin],
  modifyBabelOptions: getBabelPreset,
};
