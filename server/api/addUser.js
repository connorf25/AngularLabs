const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/addUser', newuser)
// Response = {number of users written, error}
module.exports = function(db, app) {
    app.post('/api/addUser', (req, res) => {
        console.log("Add user request recieved")
        if (!req.body) {
            return res.sendStatus(400)
        }

        var newuser = req.body;
        console.log(newuser);
        const collection = db.collection('users');

        collection.find({username: newuser.username}).count((err,count) => {
            if (count == 0) {
                collection.insertOne(newuser, (err,dbres) => {
                    console.log("Inserting new user")
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    return res.send({'num': num, err: null})
                })
            } else {
                console.log("Username exists")
                return res.send({num:0, err:"Username already exists"});
            }
        })
    })
}