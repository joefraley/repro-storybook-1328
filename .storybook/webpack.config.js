const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const getClientEnvironment = require("../config/env");
const paths = require("../config/paths");
const publicPath = "/";
const publicUrl = "";
const env = getClientEnvironment(publicUrl);

module.exports = {
  devtool: "cheap-module-source-map",
  entry: [
    require.resolve("react-dev-utils/webpackHotDevClient"),
    require.resolve("../config/polyfills"),
    require.resolve("react-error-overlay"),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx"],
    plugins: [new ModuleScopePlugin(paths.appSrc)]
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9"
                  ],
                  flexbox: "no-2009"
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin()
  ]
};
