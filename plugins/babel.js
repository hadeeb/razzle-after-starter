const pkg = require("../package.json");

function BabelPreset(_, { dev, target }) {
  const IS_BROWSER = target === "web";

  const envTarget = IS_BROWSER
    ? {
        // For browser bundle read from browserslist
        targets: pkg.browserslist,
      }
    : { targets: { node: "current" } };

  return {
    presets: [
      [
        require.resolve("@babel/preset-env"),
        {
          modules: false,
          bugfixes: true,
          loose: true,
          exclude: ["transform-typeof-symbol"],
          include: [
            "@babel/plugin-proposal-optional-chaining",
            "@babel/plugin-proposal-nullish-coalescing-operator",
          ],
          ...envTarget,
        },
      ],
      [
        require.resolve("@babel/preset-react"),
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: dev,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
          runtime: "automatic",
        },
      ],
    ],
    plugins: [
      // After.js async imports
      require.resolve("babel-plugin-after"),
      // Adds syntax support for import()
      require.resolve("@babel/plugin-syntax-dynamic-import"),
      // class properties class { handleThing = () => { } }
      [
        require.resolve("@babel/plugin-proposal-class-properties"),
        { loose: true },
      ],
      // Rest spread
      [
        require.resolve("@babel/plugin-proposal-object-rest-spread"),
        {
          loose: true,
          useBuiltIns: true,
        },
      ],
      [
        "@babel/plugin-transform-runtime",
        {
          absoluteRuntime: false,
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules: IS_BROWSER,
          version: require("@babel/runtime/package.json").version,
        },
      ],
      require.resolve("babel-plugin-macros"),
      // Remove PropTypes
      !dev && require.resolve("babel-plugin-transform-react-remove-prop-types"),
    ].filter(Boolean),
  };
}

module.exports = BabelPreset;
