var path = require('path');
var webpack = require('webpack');

var isDev = (process.env.NODE_ENV === 'development');

var config = {
  entry: [
    path.join(__dirname, 'src/client/attelier.jsx')
  ],
  output : {
    sourceFilename : '[file].map',
    path: path.join(__dirname, 'dist/client'),
    filename: 'bundle.js'
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      "components": path.join(__dirname, 'src/client/components'),
    }
  },
  module : {
    loaders : [{
      test : /\.jsx?$/,
      exclude : /(node_modules|bower_components)/,
      loaders : (isDev)? ['react-hot', 'babel'] : ['babel']
    },{
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }]
  }
}

module.exports = config;
