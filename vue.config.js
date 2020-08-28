module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
  configureWebpack: {
    output: {
      library: "orchestraUi", // Add this line to expose the library in the devServer
      libraryTarget: "umd",
    },
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
    externals: {
      quasar: {
        commonjs: "quasar",
        commonjs2: "quasar",
        root: "Quasar",
      },
      vue: {
        commonjs: "vue",
        commonjs2: "vue",
        root: "Vue",
      },
    },
  },
};
