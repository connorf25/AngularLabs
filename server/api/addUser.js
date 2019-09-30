const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/addUser', newuser)
// Response = {number of users written, error}
module.exports = function(db, app) {
    app.post('/api/addUser', (req, res) => {
        if (!req.body) {
            return res.sendStatus(400)
        }

        var newuser = req.body;
        const collection = db.collection('users');

        collection.find({username: newuser.username}).count((err,count) => {
            if (count == 0) {
                collection.insertOne(newuser, (err,dbres) => {
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num': num, err: null})
                })
            } else {
                res.send({num:0, err:"duplicate item"});
            }
        })
    })
}