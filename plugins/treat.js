const TreatPlugin = require("treat/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (config, { target, dev }) => {
  const treatOptions =
    target === "web"
      ? {
          outputLoaders: [dev ? "style-loader" : MiniCssExtractPlugin.loader],
        }
      : {
          outputCSS: false,
        };

  config.plugins.push(new TreatPlugin(treatOptions));

  return config;
};
