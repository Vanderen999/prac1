// node js path modual
// be sure to see saved webpack videos for details
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
let mode = "development";
/* target fixes a bug with browserlist and live reload and hot reload */
let target = "web";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

// exporting a node js object
module.exports = {
  // what mode it is in
  mode: "development",
  target: target,
  //   sets the entry point for the bundling process also enables react hot reloader
  entry: "./src/index.js",
  output: {
    assetModuleFilename: "Assets/[contenthash][ext][query]",
  },
  devtool: "source-map", // if you dont wont src maps like in the prod config use false
  devServer: {
    static: "./dist",
    hot: true,
    watchFiles: ["index.html"],
  },
  module: {
    rules: [
      {
        // may or may not have an x like jsx file extension
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // imports images
      {
        test: /\.(png|jp?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        // always use this loader order the order is very important
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "auto" },
          },
          "css-loader",
          // makes more advanced css useable
          "postcss-loader",
          // Loads and compiles a SASS/SCSS file into css
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    // for the html
    new HtmlWebpackPlugin({
      title: "yolo",
      filename: "index.html",
      template: "index.html",
    }),
    // for the css
    new MiniCssExtractPlugin({
      filename: "[fullhash].css",
    }),
    // for react hot reloading
    // new ReactRefreshWebpackPlugin({}),
  ],
  // resolve extension tells webpack to what kinds of files to infer
  resolve: {
    extensions: [".js", ".jsx"],
  },
  //   tells web pack where to output what it bundels
  output: {
    filename: "[name].[contenthash].js",
    // __dirname stands for directory
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
