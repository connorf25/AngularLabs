const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

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

        require('./api/addUser.js')(db, app);
        require('./api/addUserToServer.js')(db, app, ObjectID);

        require('./api/auth.js')(db, app);

        require('./api/getGroup.js')(db, app, ObjectID);
        require('./api/getUsers.js')(db, app);

        require('./api/removeGroup.js')(db, app, ObjectID);
        require('./api/removeUserFromServer.js')(db, app, ObjectID);

        require('./api/updateGroup.js')(db, app, ObjectID);
        require('./api/updateUser.js')(db, app, ObjectID);
        require('./api/updateUsers.js')(db, app, ObjectID);

    require('./listen.js')(http);
})






const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// const path = require('path')
// const http = require('http').Server(app)

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = 'chat';
const client = new MongoClient(url);

client.connect((err) => {
    console.log("Client successfully connected");
    const db = client.db(dbName)
    client.close();
})



app.post('/api/auth', require('./api/auth.js'))
app.post('/api/addUser', require('./api/addUser.js'))
app.post('/api/getUsers', require('./api/getUsers.js'))
app.post('/api/updateUsers', require('./api/updateUsers.js'))
app.post('/api/getGroup', require('./api/getGroup.js'))
app.post('/api/updateGroup', require('./api/updateGroup.js'))
app.post('/api/updateUser', require('./api/updateUser.js'))
app.post('/api/addUserToServer', require('./api/addUserToServer.js'))
app.post('/api/removeUserFromServer', require('./api/removeUserFromServer.js'))
app.post('/api/removeGroup', require('./api/removeGroup.js'))

const http = require("http").Server(app);
let server = http.listen(3000, () => {
    let port = server.address().port;
    console.log("Server started");
    console.log("Server listening on port: " + port);
})