const BabelEsmPlugin = require("babel-esm-plugin");

function getEs6Filename(filename) {
  return filename.replace(/\.js$/, ".es6.js");
}

module.exports = (defaultConfig, { target }) => {
  const config = Object.assign({}, defaultConfig);

  if (target === "web") {
    config.plugins.push(
      new BabelEsmPlugin({
        filename: getEs6Filename(config.output.filename),
        chunkFilename: getEs6Filename(config.output.chunkFilename)
      })
    );
  }

  return config;
};
