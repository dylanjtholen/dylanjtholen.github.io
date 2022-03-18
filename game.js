var socket = io();

var state = {
  state: 'gameplay',
  states: ['menu', 'gameplay', 'skins']
}
var playerinfo = {
  up: false,
  down: false,
  left: false,
  right: false,
  mousex: 0,
  mousey: 0,
  color: window.prompt('color')
}

//switch (state.state) {
//case 'gameplay':
document.addEventListener('keydown',   function(event) {
  switch (event.keyCode) {
    case 65: // A
      playerinfo.left = true;
      break;
    case 87: // W
      playerinfo.up = true;
      break;
    case 68: // D
      playerinfo.right = true;
      break;
    case 83: // S
      playerinfo.down = true;
      break;
    case 37: // LEFT
      playerinfo.left = true;
      break;
    case 38: // UP
      playerinfo.up = true;
      break;
    case 39: // RIGHT
      playerinfo.right = true;
      break;
    case 40: // DOWN
      playerinfo.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      playerinfo.left = false;
      break;
    case 87: // W
      playerinfo.up = false;
      break;
    case 68: // D
      playerinfo.right = false;
      break;
    case 83: // S
      playerinfo.down = false;
      break;
    case 37: // LEFT
      playerinfo.left = false;
      break;
    case 38: // UP
      playerinfo.up = false;
      break;
    case 39: // RIGHT
      playerinfo.right = false;
      break;
    case 40: // DOWN
      playerinfo.down = false;
      break;
  }
});
document.addEventListener('mousemove', function(event) {
  playerinfo.mousex = event.clientX;
  playerinfo.mousey = event.clientY;
});

socket.emit('new player');
setInterval(function() {
  socket.emit('playerinfo', playerinfo);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
socket.on('state', function(players) {
  console.log(players);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var id in players) {
    var player = players[id];
    c.fillStyle = player.color
    c.beginPath();
    c.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    c.fill();
  }
});
//break;
//}