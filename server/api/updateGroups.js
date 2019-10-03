const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
// Usage: this.httpClient.post('http://localhost:3000/api/updateGroups', groups, { ...httpOptions, responseType: 'text' })
module.exports = function(app) {
    app.post('/api/updateGroups', (req, res) => {
        MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
            if (err) {return console.log(err)}
                const db = client.db(dbName);
            if (!req.body) {
                console.log("Error: no request body")
                return res.sendStatus(400);
            }
            console.log("Update Groups request recieved")
            var groups = req.body;
            const collection = db.collection('groups')
            collection.remove()
            for(i in groups) {
                collection.insert(groups[i]);
            }
            res.send("Groups updated")
        })
    })
}