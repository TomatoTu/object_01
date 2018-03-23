var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'eventsource-polyfill',
    //'webpack-hot-middleware/client?reload=true',
    './js/src/index'
  ],
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  debug: true,
  devtool: 'source-map',
  debug: false,
  devtool: false,
  plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
	  { test: /\.less$/, loader: "style!css!less" }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify-loader']
      }
    ]
  }

};
