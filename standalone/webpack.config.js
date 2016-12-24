'use strict';

const webpack = require("webpack");

module.exports = {
  context: __dirname + "/src",
  entry: {
    app: "./index.js",
    vendor: ["aurelia-dependency-injection", "whatwg-fetch", 'aurelia-polyfills']
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
    publicPath: "/",            // New
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js"})
  ]
};