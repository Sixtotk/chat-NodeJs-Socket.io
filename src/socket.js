module.exports = (io) => {

  let nickNames = []
  io.on('connection', socket => {
    console.log('Nuevo usuario detectado');

    //Al recibir el mensaje recojemos los datos
    socket.on('enviar mensaje', (datos) => {
      //console.log(datos);

      io.sockets.emit('nuevo mensaje', {
        msg:datos,
        username:socket.nickname
      })

    })

    socket.on('nuevo usuario', (datos, cb) => {
      if(nickNames.indexOf(datos) != -1){
        cb(false)
      }else{
        cb(true)
        socket.nickname = datos
        nickNames.push(socket.nickname)

        io.sockets.emit('nombre usuario', nickNames)
      }
    })

    socket.on('disconnect', datos => {
      if(!socket.nickname){
        return
      } else {
        nickNames.splice(nickNames.indexOf(socket.nickname), 1)
        io.sockets.emit('nombre usuario', nickNames)
      }
    })

  })
}
