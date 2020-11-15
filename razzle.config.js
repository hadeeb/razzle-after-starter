const getBabelPreset = require("./plugins/babel");
const polyfills = require("./plugins/polyfills");
const bundleAnalyzerPlugin = require("./plugins/bundleAnalyzer");

const plugins = [polyfills, bundleAnalyzerPlugin];

module.exports = {
  modifyBabelOptions: getBabelPreset,
  modifyWebpackConfig({ webpackConfig, ...rest }) {
    return plugins.reduce((config, plugin) => {
      if (!plugin.modifyWebpackConfig) return config;
      return plugin.modifyWebpackConfig({ webpackConfig: config, ...rest });
    }, webpackConfig);
  },
  experimental: {
    newExternals: true,
    newSplitChunks: true,
    newContentHash: true,
    newMainFields: true,
  },
};
