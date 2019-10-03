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


// const collection = db.collection('users')
// collection.insertOne({username:"super",email:"super@gmail.com",pw:"123",supp:true,ofGroupAdminsRole:true,groupList:[]})

require('./api/addUser.js')(app);
require('./api/addUserToServer.js')(app);

require('./api/auth.js')(app);

require('./api/getGroup.js')(app);
require('./api/getUsers.js')(app);

require('./api/removeGroup.js')(app);
require('./api/removeUserFromServer.js')(app);

require('./api/updateGroup.js')(app, ObjectID);
require('./api/updateUser.js')(app, ObjectID);
require('./api/updateUsers.js')(app);

port = 3000
socket.connect(io, port);
require('./listen.js')(http, port);

module.exports = app; // export for testing