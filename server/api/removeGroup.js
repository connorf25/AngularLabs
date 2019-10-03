const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
// Usage: this.httpClient.post('http://localhost:3000/api/removeGroup', {"name": groupName}, { ...httpOptions, responseType: 'text' })
module.exports = function(app) {
    app.post('/api/removeGroup', (req, res) => {
        MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
            if (err) {return console.log(err)}
                const db = client.db(dbName);
            console.log("RemoveGroup request recieved")
            if (!req.body) {
                console.log("Error: no request body")
                return res.sendStatus(400);
            }
            var groupName = req.body.name;
            const collection = db.collection('groups')

            collection.deleteOne(
                {name: groupName},
                (err) => {
                    if (err) throw err;
                    res.send({err: null})
                }
            )
        })
    })
}