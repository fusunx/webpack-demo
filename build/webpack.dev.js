const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge({
	mode: 'development',
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js'
	},
	// 服务器配置
	devServer: {
		port: 9998,
		// 当使用HTML5 API时，任意的404页面都可能需要被替代为index.html
		historyApiFallback: true, // 解决单页面路由问题
		contentBase: '../dist',
		open: true, // 自动打开浏览器
		hot: true, //开启热更新， css代码更新不刷新页面
		// hotOnly: true 开启后只有手动配置才能更新，即使hot为true也不刷新浏览器
		proxy: {
			index: '', // 将index设置为空，可以对跟路径进行转发
			'api/get': 'xxxx.com/api', // 第一种方式，直接代理到api路径
			'api/vue': {  // 第二种方式，在路径需要临时替换时使用
				target: 'xxxx.com/api',
				pathRewrite: {
					'head': 'demo'  //此时访问head路径将被代理到demo下
				},
				secure: false,  //对https请求的配置，false为支持https
				changeOrigin: true  //做代理分发时允许访问其他网站，突破网站限制，建议在开发环境使用
			},
		}
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					'sass-loader'
				]
			}
		]
	}
}, base);