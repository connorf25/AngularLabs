const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
// Usage: this.httpClient.post('http://localhost:3000/api/addUserToServer', {username, servername}, { ...httpOptions, responseType: 'text' })
// Adds server to user groupList, still need to update group seperately
module.exports = function(app, ObjectID) {
    app.post('/api/addUserToServer', (req, res) => {
        MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
            if (err) {return console.log(err)}
                const db = client.db(dbName);
            if (!req.body) {
                return res.sendStatus(400)
            }

            var username = req.body.username
            var servername = req.body.servername
            var num = 0
            console.log("Adding: ", username, " to: ", servername)

            const collection = db.collection('users');

            collection.find({'username': username}).count((err,count) => {
                if (count == 0) {
                    // No user exists, insert
                    var newuser = {
                        username: username,
                        email: "",
                        pw: "",
                        supp: false,
                        ofGroupAdminsRole: false,
                        groupList: [ servername ]
                    }
                    collection.insertOne(newuser, (err,dbres) => {
                        if (err) throw err;
                        num = dbres.insertedCount;
                        res.send({'num': num, err: null})
                    })
                } else {
                    // User Exists, push to grouplist
                    res.send({num:0, err:"duplicate item"});
                    collection.updateOne(
                        {username: username},
                        {$push: {groupList: servername}}
                    )
                }
            })
        })
    })
}