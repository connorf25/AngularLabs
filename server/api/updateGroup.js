const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/updateGroup', groupObject, { ...httpOptions, responseType: 'text' })
module.exports = function(db, app, ObjectID) {
    app.post('/api/updateGroup', (req, res) => {
        if (!req.body) {
            console.log("Error: no request body")
            return res.sendStatus(400);
        }
        console.log("UpdateGroup request recieved")
        var group = req.body;
        const collection = db.collection('groups');

        collection.find({_id: ObjectID(group._id)}).count((err,count) => {
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
                    {_id: ObjectID(group._id)},
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
}