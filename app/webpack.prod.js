const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const baseConfig = require('./webpack.common.js').webpack_config;

const config = merge(baseConfig, {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
                cssnano()
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
                env: 'production'
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '65-80'
      }
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: 'all',
      })
    ]
  }
});

module.exports = config;
