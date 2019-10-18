var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			res.writeHead(200);
			res.end(data);
		});
}

io.on('connection', function (socket) {
	console.log('welcome 1');
	socket.emit('welcome', { welcome: 'Welcome to chat!' });
	socket.on('send message', function (data) {
		console.log(data);
		io.emit('send message', data);
	});
});