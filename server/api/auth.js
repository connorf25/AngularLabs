const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
// Usage: this.httpClient.post('http://localhost:3000/api/auth', user, httpOptions)
module.exports = function(app) {
    app.post('/api/auth', (req, res) => {
        MongoClient.connect(url, { poolSize:10, useNewUrlParser: true, useUnifiedTopology: true }, function(err,client) {
            if (err) {return console.log(err)}
                const db = client.db(dbName);
            if (!req.body) {
                console.log("Error: no request body")
                return res.sendStatus(400);
            }
        
            console.log("Login request recieved")
            var customer = {};
        
            customer.username = req.body.username;
            customer.pw = req.body.pw;
            customer.valid = false;
        
            const collection = db.collection('users');
        
            collection.findOne({username: customer.username}, function(err, user) {
                if( user && user.pw == customer.pw ) {
                    customer = user
                    customer.valid = true
                }
                console.log("Correct login ", customer.valid)
                return res.send(customer)
            })
        })
    })
}