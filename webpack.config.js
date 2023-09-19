const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'production',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false
					}
				},
				extractComments: false
			})
		]
	},
	externals: [nodeExternals()]
};
