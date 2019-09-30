const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/removeGroup', {"name": groupName}, { ...httpOptions, responseType: 'text' })
module.exports = function(db, app) {
    app.post('/api/removeGroup', (req, res) => {
        console.log("RemoveGroup request recieved")
        if (!req.body) {
            console.log("Error: no request body")
            return res.sendStatus(400);
        }
        var groupName = req.body.name;
        const collection = db.collection('groups')

        collection.remove(
            {name: groupName},
            (err) => {
                if (err) throw err;
                res.send("Successfully removed group")
            }
        )
    })
}