var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js', //入口文件
	output:{
		path: path.join(__dirname,'dist'),
		publicPath: '/dist/',
		filename:'bundle.js',

	},
	module:{
		rules:[
			{test:/\.js|jsx$/,
				exclude:[path.resolve(__dirname,'node_modules')],
				use:[
				{loader:'babel-loader', 
				query:{
                    presets:['es2015','react','babel-preset-stage-0'] //必须先安装babel-preset-es2015和babel-preset-react,（stage-0 是es7语法）
                }}
			]},
			{test:/\.css$/,use:ExtractTextPlugin.extract({
				fallback:'style-loader',
				use:'css-loader'
			})},
			{test:/\.scss$/,use:ExtractTextPlugin.extract({
				fallback:'style-loader',
				use:'css-loader!sass-loader'
			})},                                                                                     
			{test:/\.(png|jpg|gif)$/,use:[
				{loader:'url-loader',options:{limit:8192}}
				
			]},

		]
	},
	resolve: {
	    alias: {
	      rootsrc: path.resolve(__dirname, 'src/'),//定义别名 在后面import from中使用很有效
	      rootstatics: path.resolve(__dirname, 'statics/'),//定义别名 在后面import from中使用很有效
	    }
	  },
	devServer: {
	  publicPath:'/dist',//静态目录路径
	  contentBase: path.join(__dirname, "/"),//静态路径，HTML所在路径
	  compress: true,
	  inline: true,
	  port: 8080
	},
	plugins:  [
      new ExtractTextPlugin("styles.css"), 
      new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
             filename:'../index.html',    //生成的html存放路径，相对于 output.path
             template:'./src/index.html',    //html模板路径
             inject:false,    //允许插件修改哪些内容，包括head与body
             hash:true,    //为静态资源生成hash值
             minify:{    //压缩HTML文件
                 removeComments:true,    //移除HTML中的注释
                 collapseWhitespace:false    //删除空白符与换行符
             },
         })
	],


}