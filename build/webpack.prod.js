const merge = require('webpack-merge');
const miniCssExtract = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const base = require('./webpack.base');

module.exports = merge({
	mode: 'production',
	output: {
		filename: 'js/[name]_[contenthash].js',
		chunkFilename: 'js/[name]_[contenthash].chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					{
						loader: miniCssExtract.loader,
						options: {
							filename: '[name].css',
							chunkFilename: '[name].chunk.css',
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2 // 该方式可以让@import引入的css文件再次执行一遍css打包
						}
					},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new miniCssExtract({
			filename: 'css/[name]_[hash].css',
			chunkFilename: 'css/[name]_[hash].chunk.css'
		}),
		new CleanWebpackPlugin()
	]
}, base);