const path = require("path");
const webpack = require("webpack");
const CSSExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";
const isDev = !isProd;

module.exports = {
  name: "renderer",
  mode: isProd ? "production" : "development",
  devtool: isProd ? "source-map" : "inline-source-map",
  target: "electron-renderer",
  entry: './src/renderer.js',
  output: {
    filename: "renderer.js",
    path: path.join(__dirname, "build")
  },
  resolve: {
    extensions: [".js", ".json", ".marko"]
  },
  module: {
    rules: [
      {
        test: /\.marko$/,
        loader: "@marko/webpack/loader"
      },
      {
        test: /\.(less|css)$/,
        use: [CSSExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.svg/,
        loader: "svg-url-loader"
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: "file-loader",
        options: {
          // File assets from server & browser compiler output to client folder.
          outputPath: "../"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.browser": true
    }),
    new CSSExtractPlugin({
      filename: "renderer.css"
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/main.js', to: 'main.js' },
        { from: 'src/index.html', to: 'index.html' },
      ],
    }),
  ]
}