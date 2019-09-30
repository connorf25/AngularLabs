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

        // require('./api/getGroup.js')(db, app, ObjectID);
        // require('./api/getUsers.js')(db, app);

        // require('./api/removeGroup.js')(db, app, ObjectID);
        // require('./api/removeUserFromServer.js')(db, app, ObjectID);

        // require('./api/updateGroup.js')(db, app, ObjectID);
        // require('./api/updateUser.js')(db, app, ObjectID);
        // require('./api/updateUsers.js')(db, app, ObjectID);

    require('./listen.js')(http);
})