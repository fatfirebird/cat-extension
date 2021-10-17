const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin')

const manifest = require('./src/static/manifest.json')

const USE_CSS_MODULES = true
const mainPath = path.join(process.cwd())
const nodeEnv = process.env.NODE_ENV || 'development'
const isDev = nodeEnv === 'development'

const PATHS = {
  main: mainPath,
  build: `${mainPath}/build`,
  static: `${mainPath}/src/static`,
  background: `${mainPath}/src/background/index.ts`,
  content: `${mainPath}/src/content/index.ts`,
  popup: `${mainPath}/src/popup/index.ts`,
}

const pages = [
  {
    title: 'cats app',
    manifest: 'manifest.json',
    template: `${PATHS.static}/index.html`,
    filename: 'index.html',
    chunks: ['popup', 'background'],
  },
]

const getPlugins = () => {
  const plugins = [
    ...pages.map(
      (p) =>
        new HtmlWebPackPlugin({
          ...p,
          meta: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            'theme-color': '#000000',
          },
        })
    ),
    new Dotenv({
      path: path.resolve(__dirname, './.env'),
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.static}/icons`,
          to: 'icons',
        },
      ],
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: manifest,
      },
    }),
  ]

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: `${PATHS.static}css/[name].css`,
        chunkFilename: `${PATHS.static}css/[id].css`,
        ignoreOrder: true,
      })
    )
  }

  return plugins
}

module.exports = {
  entry: {
    content: PATHS.content,
    background: PATHS.background,
    popup: PATHS.popup,
  },
  output: {
    filename: '[name].js',
    path: PATHS.build,
  },
  externals: {
    paths: PATHS,
  },
  optimization: {
    splitChunks: {
      chunks: isDev ? 'async' : 'all',
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx|ts)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: isDev },
        },
      },
      {
        test: /\.(gif|png|jpe?g|webp|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 10240,
          name: `${PATHS.assets}img/[name]__[hash:8].[ext]`,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          ...(isDev ? [{ loader: 'style-loader' }] : [{ loader: MiniCssExtractPlugin.loader }]),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: USE_CSS_MODULES && {
                localIdentName: isDev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
                localIdentContext: path.resolve(process.cwd(), 'src'),
                localIdentHashPrefix: 'ff',
              },
              sourceMap: isDev,
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.sass'],
  },
  plugins: getPlugins(),
}
