const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
// Usage: this.httpClient.post('http://localhost:3000/api/removeUserFromServer', {username, servername}, { ...httpOptions, responseType: 'text' })
// Adds server to user groupList, still need to update group seperately
module.exports = function(app) {
        app.post('/api/removeUserFromServer', (req, res) => {
            MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
                if (err) {return console.log(err)}
                    const db = client.db(dbName);
            console.log("RemoveUserFromServer request recieved")
            var username = req.body.username;
            var servername = req.body.servername
            const users_collection = db.collection('users');

            users_collection.updateOne(
                {username: username},
                {$pull: { groupList: servername }}
            )
        })
    })
}