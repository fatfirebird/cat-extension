const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('../webpack.config')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')

require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

const DevelopWbConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  // plugins: [
  //   new ChromeExtensionReloader({
  //     port: 3030,
  //     reloadPage: true,
  //     entries: {
  //       contentScript: 'app',
  //       background: 'background',
  //     },
  //   }),
  // ],
})
// devServer: {
//   historyApiFallback: true,
//   inline: true,
//   contentBase: baseWebpackConfig.externals.paths.dist,
//   host: process.env.HOST,
//   overlay: {
//     warnings: true,
//     errors: true,
//   },
//   hot: true,
//   port: process.env.PORT,
//   http2: process.env.HTTPS === 'true' ? true : false,
// },
// plugins: [new webpack.SourceMapDevToolPlugin({})],

module.exports = new Promise((resolve) => resolve(DevelopWbConfig))
