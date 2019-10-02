const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const io = require('socket.io')(http);
const socket = require('./sockets.js')

app.use(cors());
app.use(bodyParser.json());

// Can use this to host dist on port 3000
// Run ngBuild to update
app.use(express.static(__dirname + "/../dist/Week4/"));

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
    if (err) {return console.log(err)}
        const dbName = 'mydb';
        const db = client.db(dbName);

        // const collection = db.collection('users')
        // collection.insertOne({username:"super",email:"super@gmail.com",pw:"123",supp:true,ofGroupAdminsRole:true,groupList:[]})

        require('./api/addUser.js')(db, app);
        require('./api/addUserToServer.js')(db, app);

        require('./api/auth.js')(db, app);

        require('./api/getGroup.js')(db, app);
        require('./api/getUsers.js')(db, app);

        require('./api/removeGroup.js')(db, app);
        require('./api/removeUserFromServer.js')(db, app);

        require('./api/updateGroup.js')(db, app, ObjectID);
        require('./api/updateUser.js')(db, app, ObjectID);
        require('./api/updateUsers.js')(db, app);

    port = 3000
    socket.connect(io, port);
    require('./listen.js')(http, port);
})