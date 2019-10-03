const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
// Usage: this.httpClient.post('http://localhost:3000/api/getUsers', user, httpOptions)
module.exports = function(app) {
    app.post('/api/getUsers', (req, res) => {
        MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
            if (err) {return console.log(err)}
                const db = client.db(dbName);
            if (!req.body) {
                console.log("Error: no request body")
                return res.sendStatus(400);
            }
            console.log("GetUsers request recieved")
            // If user is super user
            if(req.body.supp) {
                const collection = db.collection('users')
                collection.find({}).toArray((err,data) => {
                    if (err) throw err;
                    res.send(data);
                })
            } else {
                res.send({err: "Invalid permissions"})
            }
        })
    })
}