// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function(data) {
    players[socket.id] = {
      x: 0,
      y: 0,
    };
  });
  socket.on('disconnect', function() {
    players[socket.id] = {
      
    }
  });
  socket.on('playerinfo', function(data) {
    var player = players[socket.id] || {};
    player.x = data.mousex;
    player.y = data.mousey;
    player.color = data.color;
    /*if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }*/
  });
});

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);