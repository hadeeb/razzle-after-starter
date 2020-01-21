const getDefaultPreset = require("razzle/babel");

function preset() {
  // Destructuring default preset so
  // babel-esm-plugin can detect preset-env
  const defaultpreset = getDefaultPreset();
  return {
    presets: defaultpreset.presets,
    plugins: [
      ...defaultpreset.plugins,
      require.resolve("babel-plugin-macros"),
      require.resolve("babel-plugin-emotion")
      // more plugins
    ]
  };
}

module.exports = preset;
