const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {},
      }),
    ],
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
}
