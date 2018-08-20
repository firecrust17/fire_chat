var express = require('express');
app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// NAMESPACE
var client_chat = io.of('/chat');

var port = 3000;
server.listen(port, function(){
  console.log('listening on *:'+port);
});

app.use(express.static('public'));

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/public/login.html'); // to serve html

});

app.get('/socket.io.js', (req, res, next) => {
    return res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.post('/chat', function(req, res){
  try{
    client_chat.to(req.query.room).emit(req.query.event, JSON.parse(req.query.message));
    console.log('Notification Message sent to: '+ req.query.room);
  }catch(e){
    throw e;
  }
  res.send('OK');
});

client_chat
.on('connection', function(socket) {

  //  JOIN ROOM
  socket.join(socket.handshake.query.room);

  console.log("connection chat notif");
  console.log(socket.server.engine.clientsCount);
  socket.broadcast.to(socket.handshake.query.room).emit('chat notif', socket.handshake.query.name+" connected");  //  broadcast
  
  socket.on('chat message', function(msg){
    socket.broadcast.to(socket.handshake.query.room).emit('chat message', msg); //  emit
  });

  socket.on('typing', function(msg){
    socket.broadcast.to(socket.handshake.query.room).emit('typing', msg);	//	emit
  });

  socket.on('disconnect', function(){
    console.log(socket.server.engine.clientsCount);   //  client count
  });
  
});

