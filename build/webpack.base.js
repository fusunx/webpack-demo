const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const template = path.resolve(__dirname, '../index.html');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			{ // 将es6编译成es5
				test: /\.jsx?$/, // 表示x有0个或一个
				exclude: /node_modules/, // 不编译某个目录下的文件
				include: path.resolve(__dirname, '../src'),
				use: [
					"babel-loader"
				]
			},
			{ // 加载解析文件资源
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						// 配置打包后的文件名
						name: '[name].[ext]?[hash]',
						outputPath: 'images/',
						limit: 4096 // 当图片大于4k时将以文件形式输出，否则以base64输出
					}
				}
			},
			{ // 引入字体，svg等文件
				test: /\.(eot|ttf|svg)$/,
				use: {
					loader: 'file-loader'
				}
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template,
			filename: 'index.html'
		})
	],
	optimization: {
		usedExports: true,
		splitChunks: { // 分割js代码
			chunks: 'all',
			// chunks: 'async', // 表示只对异步代码进行分割
			minSize: 30000, // 当超过指定大小的做代码分割
			// maxSize: 20000, // 当大于最大尺寸时对代码进行二次分割
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '_',
			name: true,
			cacheGroups: { // 缓存组：如果满足vendor条件就按vendor打包，否则按default打包
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10, // 权重越大，打包优先级越高
					// filename: 'js/vendor.js' // 将代码打包为名为vendor.js的文件
					name: 'vendor'
				},
				default: {
					minChunks: 2,
					priority: -20,
					name: 'common',
					// filename: 'js/common.js'
					reuseExistingChunk: true // 是否复用已经打包过的代码
				}
			}
		}
	}
};