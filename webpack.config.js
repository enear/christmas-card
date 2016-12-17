var path = require('path');
module.exports = {
	entry: './public/js/main.js',
	output: {
		path: path.join(__dirname, '/public/js/'),
		filename: 'app.js'
	},
	module: {
		loaders: [
			{
				test: path.join(__dirname, '/public/js/'),
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'stage-2' ]
				}
			}
		]
	},
	devtool: 'source-map'
};