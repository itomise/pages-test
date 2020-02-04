const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common').webpack_config;
const rootDir = require('./webpack.common').rootDir;
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: rootDir
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 2,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ]
            }
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              data: {
                env: 'development'
              }
            }
          }
        ]
      },
    ]
  }
});

// entryにhot-middlewareを追加する
for (const key in config.entry) {
  if (config.entry.hasOwnProperty(key)) {  // eslint-disable-line
    config.entry[key].unshift('webpack/hot/dev-server');
    config.entry[key].unshift('webpack-hot-middleware/client');
  }
}

module.exports = config;
