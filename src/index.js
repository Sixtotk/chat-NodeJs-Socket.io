const express = require('express');
const path = require('path')

const app = express();

const server = require('http').Server(app);
const socketIo = require('socket.io')(server);


//Ejecutamos la funcion de sockets.js
require('./socket')(socketIo)

app.set('port', process.env.PORT || 3001)

app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), () => {
  console.log('Servidor en el puerto', app.get('port'));
})