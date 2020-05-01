module.exports = (config, { target, dev }) => {
  if (target === "web") {
    config.entry = {
      ...config.entry,
      polyfills: require.resolve("@next/polyfill-nomodule"),
    };
    config.output.filename = config.output.filename.replace("bundle", "[name]");
  }

  return config;
};
