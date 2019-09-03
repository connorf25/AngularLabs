const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// const path = require('path')
// const http = require('http').Server(app)

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Can use this to host dist on port 3000
// Run ngBuild to update
app.use(express.static(__dirname + "/../dist/Week4/"));

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