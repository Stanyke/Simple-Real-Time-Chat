var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
});

//Sever should send a message to client as soon the user connects
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'You are connected!');

    //Recieve a message from the frontend
    socket.on('message', function (message) {
        console.log('A client is speaking to me! They’re saying: ' + message);
    });

    //Sends to everyother user logged in except the current user that just logged in
    socket.broadcast.emit('message', 'Another client has just connected!');
});


server.listen(8080);