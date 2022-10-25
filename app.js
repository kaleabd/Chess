const express = require ("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var boardArr = [
    [5,3,4,9,10,4,3,5],
    [1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [11,11,11,11,11,11,11,11],
    [55,33,44,99,100,44,33,55]
  ]
let player = 11;
app.use(express.static("public"));


app.get("/" ,function(request , response){
    response.sendFile(__dirname+'/index.html');
});


io.on('connection', (socket) => {
    io.emit('player', player);
    io.emit('board', boardArr);
  socket.on('boardUpdate', msg => {
    boardArr = msg;
    io.emit('board', boardArr);
  });
// `  socket.on("playerTypeUpdate", msg=>{
//     console.log("Updating playerType", player, " and the message is: ", msg)
//     player = msg;
//     console.log("Done Updathing the player", player)
// })`
});

http.listen(3000, () => {
  console.log(`Socket.IO server running at http://localhost:${3000}/`);
});


