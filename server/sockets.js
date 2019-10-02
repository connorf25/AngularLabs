module.exports = {
    connect: function(io, PORT) {
        io.on('connection', (socket) => {
            console.log("User connection on port " + PORT + ":" + socket.id);

            socket.on('message', (message_data) => {
                room = message_data.room
                message = message_data.message
                io.sockets.in(room).emit('message', message);
            })

            socket.on('create', function (room) {
                socket.join(room);
            });
        })
    }
}