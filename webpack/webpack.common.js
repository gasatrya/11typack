const Path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = {
  entry: {
    frontend: [
      Path.resolve(__dirname, '../src/_assets/js/index.js'),
      Path.resolve(__dirname, '../src/_assets/css/index.css'),
    ],
  },
  output: {
    path: Path.join(__dirname, '../dist/assets'),
    filename: '[name].js',
  },
  // Any `import`s from `node_modules` will compiled in to a `vendors.js` file.
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackAssetsManifest({
      output: Path.resolve(__dirname, '../src/_data/manifest.json'),
      merge: true,
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        type: 'asset/resource',
      },
    ],
  },
}
