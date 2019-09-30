const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/updateUser', userObject, { ...httpOptions, responseType: 'text' })
module.exports = function(db, app) {
    app.post('/api/updateUser', (req, res) => {
        if (!req.body) {
            console.log("Error: no request body")
            return res.sendStatus(400);
        }
        console.log("UpdateUser request recieved")
        var user = req.body;
        const collection = db.collection('users');

        collection.find({_id: user._id}).count((err,count) => {
            // No user exists, insert
            if (count == 0) {
                collection.insertOne(
                    user,
                    (err) => {
                        if (err) throw err;
                        res.send("User added");
                    }
                )
            }
            // User exists, update 
            else {
                collection.updateOne(
                    {_id: user._id},
                    {$set: {username: user.username, email: user.email, pw: user.pw, supp: user.supp, ofGroupAdminsRole: user.ofGroupAdminsRole, groupList: user.groupList}},
                    (err) => {
                        if (err) throw err;
                        res.send("User updated");
                    }
                )
            }
        })
    })
}