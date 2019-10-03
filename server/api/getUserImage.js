const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
// Usage: this.httpClient.post('http://localhost:3000/api/getUserImage', {username: user.username}, httpOptions)
module.exports = function(app) {
    app.post("/api/getUserImage", (req, res) => {
        MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
            if (err) {return console.log(err)}
                const db = client.db(dbName);
            console.log("GetUserImage request recieved")
            if (!req.body) {
                console.log("Error: no request body")
                return res.sendStatus(400);
            }

            var username = req.body.username;
            const collection = db.collection('users');

            collection.findOne(
                {username: username},
                (err, user) => {
                    if (user && user.pic) {
                        res.send({image: user.pic})
                    } else {
                        res.send({image: "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/social/thumbnail/apple-id-account-person-thumbnail-2x.png"})
                    }
                }
            )
        })
    })
}