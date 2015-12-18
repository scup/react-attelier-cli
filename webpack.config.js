module.exports = {
  entry : './src/client/components/attelier.jsx',
  output : {
    filename : 'dist/bundle.js',
    sourceFilename : '[file].map'
  },
  devtool: 'source-map',
  module : {
    loaders : [{
      test : /\.jsx?$/,
      exclude : /(node_modules|bower_components)/,
      loader : 'babel'
    },{
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }]
  }
}
