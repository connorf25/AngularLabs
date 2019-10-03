const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
// Usage: this.httpClient.post('http://localhost:3000/api/updateUsers', users, { ...httpOptions, responseType: 'text' })
module.exports = function(app) {
    app.post('/api/updateUsers', (req, res) => {
        MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
            if (err) {return console.log(err)}
                const db = client.db(dbName);
            if (!req.body) {
                console.log("Error: no request body")
                return res.sendStatus(400);
            }
            console.log("Update Users request recieved")
            var users = req.body;
            const collection = db.collection('users')
            collection.remove()
            for(i in users) {
                collection.insert(users[i]);
            }
        })
    })
}