const getBabelPreset = require("./plugins/babel");
const esmPlugin = require("./plugins/esm");
const bundleAnalyzerPlugin = require("./plugins/bundleAnalyzer");

module.exports = {
  plugins: ["manifest", esmPlugin, bundleAnalyzerPlugin],
  modifyBabelOptions: getBabelPreset
};
