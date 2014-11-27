var express = require('express');
var app = express();
var server = require('http').createServer(app);

var net = require('net');
var controlSock = new net.Socket({
	fd: 3, readable: true, writable: true
});
controlSock.on('error', function(){});

app.use(express.static(__dirname + '/public'));

server.listen(0, '127.0.0.1', function() {
	controlSock.write(JSON.stringify({
		proxy: this.address().port
	}));
	controlSock.write('\n');
});

