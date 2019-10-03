const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

pushToDB = (group, channel, message) => {
    MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
        if (err) {return console.log(err)}
        const db = client.db(dbName);
        const collection = db.collection('groups');

        collection.updateOne(
            { "name": group, "channels.name": channel },
            { $push: {"channels.$.messages": message} }
        )
    })
}

module.exports = {
    connect: function(io, PORT) {
        io.on('connection', (socket) => {
            console.log("User connection on port " + PORT + ":" + socket.id);

            socket.on('message', (message_data) => {
                group = message_data.group
                room = message_data.room
                io.sockets.in(room).emit('message', message_data);
                // Push message to DB
                pushToDB(group, room, message_data)
            })

            socket.on('create', function (room, username) {
                io.sockets.in(room).emit('message', {room: room, sender: "SERVER", message: username + " has joined " + room, pic: "https://146a55aca6f00848c565-a7635525d40ac1c70300198708936b4e.ssl.cf1.rackcdn.com/images/ef6ba9d6e54f13861a0cb406962b00ed17670956.png"});
                console.log(username + " has joined")
                socket.join(room);
            });

            socket.on('leave', function (room, username) {
                socket.leave(room);
                console.log(username + " has left");
                io.sockets.in(room).emit('message', {room: room, sender: "SERVER", message: username + " has left " + room, pic: "https://146a55aca6f00848c565-a7635525d40ac1c70300198708936b4e.ssl.cf1.rackcdn.com/images/ef6ba9d6e54f13861a0cb406962b00ed17670956.png"});
            });
        })
    }
}