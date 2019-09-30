const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/updateGroup', groupObject, { ...httpOptions, responseType: 'text' })
module.exports = function(db, app) {
    app.post('/api/updateGroup', (req, res) => {
        if (!req.body) {
            console.log("Error: no request body")
            return res.sendStatus(400);
        }
        console.log("UpdateGroup request recieved")
        var group = req.body;
        var groups = [];
        const collection = db.collection('groups');

        collection.find({_id: group._id}).count((err,count) => {
            // No group exists, insert
            if (count == 0) {
                collection.insertOne(
                    group,
                    (err) => {
                        if (err) throw err;
                        res.send("Group added");
                    }
                )
            }
            // Group exists, update 
            else {
                collection.updateOne(
                    {_id: group._id},
                    {$set: {name: group.name, groupAdmin: group.groupAdmin, groupAssis: group.groupAssis, channels: group.channels}},
                    (err) => {
                        if (err) throw err;
                        res.send("Group updated");
                    }
                )
            }
        })
    })
}