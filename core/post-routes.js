'use strict';

var app = require('./app');

app.use(function(req, res){
	res.status(404).render('errors/404');
});

if (app.settings.env != 'development'){
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.status(500).render('errors/5xx');
	});
}
