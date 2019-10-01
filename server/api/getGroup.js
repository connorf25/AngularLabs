const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/getGroup', groupName, httpOptions)
module.exports = function(db, app) {
    app.post("/api/getGroup", (req, res) => {
        console.log("GetGroups request recieved")
        if (!req.body) {
            console.log("Error: no request body")
            return res.sendStatus(400);
        }

        var groupName = req.body.name;
        const collection = db.collection('groups');

        collection.findOne(
            {name: groupName},
            (err, group) => {
                console.log("Sending group to client:")
                console.log(group)
                res.send(group)
            }
        )
    })
}