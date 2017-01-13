var webpack = require('webpack');
var path = require('path');

const currentDirectory = process.cwd();
console.log('Building in ', currentDirectory);
var BUILD_DIR = path.resolve(currentDirectory, 'dist');
var APP_DIR = path.resolve(currentDirectory, 'src');

var config = {
  entry: {
      app: APP_DIR + '/index.jsx',
      vendor: ["aurelia-dependency-injection", "whatwg-fetch", 'aurelia-polyfills', 'reselect', 'react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
    publicPath: "/",            // New
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js"})
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;