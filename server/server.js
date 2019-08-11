const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// const path = require('path')
// const http = require('http').Server(app)

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Can use this to host dist on port 3000
app.use(express.static(__dirname + "/../dist/Week4/"));

app.post('/api/auth', require('./api/auth.js'))

const http = require("http").Server(app);
let server = http.listen(3000, () => {
    let port = server.address().port;
    console.log("Server started");
    console.log("Server listening on port: " + port);
})