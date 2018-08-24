const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: './src/app.jsx',

    output: {
        path: path.resolve(__dirname, 'dist'), // 'dist'和'./dist'是一样的，path即webpack将项目代码打包后（dist文件夹）的文件位置
        publicPath: '/dist/', // 这样打包后的资源互相引用时，路径前增加'/dist/'
        filename: 'js/app.js' // 在dist下自定义了一个js文件夹，并将打包后的js文件放到这里
    },

    module: {
        rules: [

          // react语法的处理
          {
            test: /\.jsx$/,
            exclude: /(node_modules)/, // 表示对这里的文件不作处理
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'react'] // env表示会自动根据环境来打包（例如是浏览器环境还是node等）
              }
            }
          },

          // css文件的处理
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
          },

          // sass文件的处理 
          {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
          },

          // 图片的配置
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192, // 8k
                  name: 'resource/[name].[ext]' // [ext]是扩展名
                }
              }
            ]
          },

          // 字体图标的处理
          {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192, // 8k
                  name: 'resource/[name].[ext]' // [ext]是扩展名
                }
              }
            ]
          }

        ]
    },

    plugins: [

        // 处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        // 独立css文件
        new ExtractTextPlugin('css/[name].css'), // 路径自定义

        // 提取公共模块,webpack自带的一个插件 
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 路径自定义
            filename: 'js/base.js' // 路径自定义
        })

    ],

    // 使用webpack-dev-server，开发时打包代码后可以实时自动刷新，默认端口号8080
    devServer: {
        port: 8086
    }

};