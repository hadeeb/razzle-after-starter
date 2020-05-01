const getBabelPreset = require("./plugins/babel");
const polyfills = require("./plugins/polyfills");
const bundleAnalyzerPlugin = require("./plugins/bundleAnalyzer");

module.exports = {
  plugins: [polyfills, bundleAnalyzerPlugin],
  modifyBabelOptions: getBabelPreset,
};
