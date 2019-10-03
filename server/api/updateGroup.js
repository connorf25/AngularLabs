const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
// Usage: this.httpClient.post('http://localhost:3000/api/updateGroup', groupObject, { ...httpOptions, responseType: 'text' })
module.exports = function(app, ObjectID) {
    app.post('/api/updateGroup', (req, res) => {
        MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
            if (err) {return console.log(err)}
                const db = client.db(dbName);
            if (!req.body) {
                console.log("Error: no request body")
                return res.sendStatus(400);
            }
            console.log("UpdateGroup request recieved")
            var group = req.body;
            const collection = db.collection('groups');

            collection.find({name: group.name}).count((err,count) => {
                // No group exists, insert
                if (count == 0) {
                    console.log("Inserting new group: ", group.name)
                    collection.insertOne(
                        group,
                        (err) => {
                            if (err) throw err;
                            res.send("Successfully added group");
                        }
                    )
                }
                // Group exists, update 
                else {
                    console.log("Updating group: ", group.name)
                    collection.updateOne(
                        {name: group.name},
                        {$set: {name: group.name, groupAdmin: group.groupAdmin, groupAssis: group.groupAssis, channels: group.channels, allUsers: group.allUsers}},
                        {multi: true},
                        (err) => {
                            if (err) throw err;
                            console.log("Updated group: ")
                            console.log(group)
                            res.send("Group updated");
                        }
                    )
                }
            })
        })
    })
}