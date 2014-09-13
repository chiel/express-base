'use strict';

require('./app')
	.use(require('serve-static')(process.cwd() + '/public'))
	.use(require('connect-slashes')())
	.use(require('body-parser').urlencoded({extended: true}));
