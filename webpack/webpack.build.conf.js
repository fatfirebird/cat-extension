const { merge } = require('webpack-merge')
const baseWebpackConfig = require('../webpack.config')

const BuildWbConfig = merge(baseWebpackConfig, {
  mode: 'production',
  performance: {
    hints: false,
  },
})

module.exports = new Promise((resolve) => resolve(BuildWbConfig))
