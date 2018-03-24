const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


let API_HOST = 'api-dev.cozy.nyc';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.jsx',
  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: ['es2015', 'stage-2', 'react'],
          plugins: ['transform-decorators-legacy', 'react-hot-loader/babel']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/bundle.min.js',
    chunkFilename: '[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'API_ROOT': JSON.stringify(`http://${API_HOST}`)
      }
    }),
  ]
};
