
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'src'),
    publicPath: '/src/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
      // new webpack.HotModuleReplacementPlugin()
  ]
};