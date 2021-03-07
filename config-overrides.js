const CompressionPlugin = require('compression-webpack-plugin')

module.exports = function override(config, env) {
  config.plugins.push(
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    })
  )
  return config
}
