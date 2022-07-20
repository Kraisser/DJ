const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: {
		main: path.resolve(__dirname, './src/js/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				exclude: /node_modules/,
				type: 'asset/resource',
			},
			{
				test: /\.m?mp3$/,
				exclude: /node_modules/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				exclude: /node_modules/,
				type: 'asset/inline',
			},
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								sourceMap: true,
								plugins: [require('autoprefixer')],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '[title]',
			template: './src/index.html',
		}),
	],
};
