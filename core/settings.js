'use strict';

var swig = require('swig'),
	app = require('./app');

app
	.engine('html', require('consolidate').swig)
	.set('view engine', 'html')
	.set('views', process.cwd() + '/views')
	.enable('strict routing');

if (app.settings.env == 'development'){
	swig.setDefaults({cache: false});
}
