const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/auth', user, httpOptions)
module.exports = function(req, res) {
    console.log("Login request recieved")
    var customer = {};

    customer.username = req.body.username;
    customer.pw = req.body.pw;
    customer.valid = false;

    const collection = db.collection('users');

    collection.findOne({username: customer.username}).exec(function(err, user) {
        if( user.pw == customer.pw ) {
            customer = user
            customer.valid = true
        }
        console.log(customer)
        res.send(customer)
    })
    console.log("User does not exist")
    res.send(customer)

    if (!req.body) {
        console.log("Error: no request body")
        return res.sendStatus(400);
    }
}