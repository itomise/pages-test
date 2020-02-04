const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

// ルートディレクトリの設定  - - - - - - - - - - - - - - - - - - - - -

const rootDir = ''

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const webpack_config = {
  entry: {
    main: [path.resolve(__dirname, './src/javascripts/entry.js')],
  },
  output: {
    path: path.resolve(__dirname, '../' + rootDir),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if ( file.includes('index') ) {
                  return '[name].html'
                }else {
                  return '[name]/index.html'
                }
              },
              url: false
            }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', ':data-src']
            }
          },
          // {
          //   loader: 'pug-html-loader',
          //   options: {
          //     pretty: true,
          //   }
          // }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'materials/',
              publicPath: url => {
                return rootDir + '/materials/' + url;
              }
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new CopyPlugin([
      {
        from: './favicon.ico',
        to: './'
      }
    ])
  ]
};

module.exports = {
  webpack_config,
  rootDir
}
