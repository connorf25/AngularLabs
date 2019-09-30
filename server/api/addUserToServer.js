const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/addUserToServer', {username, servername}, { ...httpOptions, responseType: 'text' })
// Adds server to user groupList, still need to update group seperately
module.exports = function(db, app, ObjectID) {
    app.post('/api/addUserToServer', (req, res) => {
        if (!req.body) {
            return res.sendStatus(400)
        }

        var username = req.username
        var servername = req.servername
        var num = 0
        console.log("Adding: ", username, " to: ", servername)

        const collection = db.collection('users');

        collection.find({'username': username}).count((err,count) => {
            if (count == 0) {
                // No user exists, insert
                var newuser = {
                    _id: ObjectID(),
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
}