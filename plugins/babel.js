const getDefaultPreset = require("razzle/babel");

const isProduction = process.env.NODE_ENV === "production";

function preset() {
  // Destructuring default preset so
  // babel-esm-plugin can detect preset-env
  const defaultpreset = getDefaultPreset();
  return {
    presets: defaultpreset.presets,
    plugins: [
      ...defaultpreset.plugins,
      require.resolve("babel-plugin-macros"),
      require.resolve("babel-plugin-emotion"),
      isProduction &&
        require.resolve("@babel/plugin-transform-react-inline-elements"),
      require.resolve("@babel/plugin-transform-react-constant-elements")
      // more plugins
    ].filter(Boolean)
  };
}

module.exports = preset;
