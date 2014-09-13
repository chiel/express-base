'use strict';

var fs = require('fs'),
	http = require('http'),
	net = require('net'),
	isString = require('mout/lang/isString'),
	config = require('./config'),
	server = http.createServer(require('./app'));

if (isString(config.listen)){
	server.on('error', function(e){
		if (e.code != 'EADDRINUSE'){
			console.error('Unknown error: ', e);
			process.exit(1);
		}

		var clientSocket = new net.Socket();
		clientSocket.on('error', function(e){
			if (e.code == 'EACCES'){
				console.error('Unable to access socket file');
				process.exit(1);
			}
			if (e.code != 'ECONNREFUSED' && e.code != 'EACCES'){
				console.error('Unknown error: ', e);
				process.exit(1);
			}

			fs.unlinkSync(config.listen);
			server.listen(config.listen);
		});

		clientSocket.connect({path: config.listen}, function(){
			console.error('Socket %s is in use, exiting...', config.listen);
			process.exit(1);
		});
	});
} else {
	server.on('error', function(e){
		if (e.code != 'EADDRINUSE'){
			console.error('Unknown error: ', e);
			process.exit(1);
		}

		console.error('Port %d is in use, exiting...', config.listen);
		process.exit(1);
	});
}

server.on('listening', function(){
	if (isString(config.listen)){
		console.log('Listening on socket %s', config.listen);
	} else {
		console.log('Listening on port %d', config.listen);
	}
});

server.listen(config.listen);
