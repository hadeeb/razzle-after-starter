function BabelPreset(_, { dev, target }) {
  const IS_BROWSER = target === "web";

  const envTarget = IS_BROWSER
    ? {
        // For browser bundle read from browserslist
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
          exclude: [
            "transform-typeof-symbol",
            "transform-regenerator",
            // fast-async will handle async
            "transform-async-to-generator",
          ],
          ...envTarget,
        },
      ],
      [
        require.resolve("@babel/preset-react"),
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: dev && IS_BROWSER,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
        },
      ],
    ],
    plugins: [
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
      // Optional chaining
      [
        require.resolve("@babel/plugin-proposal-optional-chaining"),
        { loose: true },
      ],
      // Nullish coalescing operator
      [
        require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
        { loose: true },
      ],
      // async-await transform (async-await to Promises)
      IS_BROWSER && [require.resolve("fast-async"), { spec: true }],
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
      dev && require.resolve("babel-plugin-treat"),
      require.resolve("babel-plugin-macros"),
      // Remove PropTypes
      !dev && require.resolve("babel-plugin-transform-react-remove-prop-types"),
    ].filter(Boolean),
  };
}

module.exports = BabelPreset;
