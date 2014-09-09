'use strict';

var swig = require('swig'),
	app = require('./app');

app
	.engine('html', require('consolidate').swig)
	.set('view engine', 'html')
	.set('views', process.cwd() + '/views')
	.enable('strict routing')
	.use(require('serve-static')(process.cwd() + '/public'))
	.use(require('connect-slashes')())
	.use(require('body-parser').urlencoded({extended: true}))
	.use(function(req, res){
		res.status(404).render('errors/404');
	})
	.use(function(err, req, res, next){
		console.error(err.stack);
		res.status(500).render('errors/5xx');
	});

if (app.settings.env == 'development'){
	swig.setDefaults({cache: false});
}
