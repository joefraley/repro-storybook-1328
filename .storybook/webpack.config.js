const path = require("path");
const webpack = require("webpack");
const paths = require("./paths");
const publicPath = "/";
const publicUrl = "";
const env = require("./env")(publicUrl);

module.exports = {
  entry: [
    require.resolve("react-dev-utils/webpackHotDevClient"),
    require.resolve("react-error-overlay"),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    publicPath: publicPath
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve("babel-loader")
      }
    ]
  }
};
