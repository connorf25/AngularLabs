const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/getGroup', groupName, httpOptions)
module.exports = function(req, res) {
    console.log("GetGroups request recieved")
    var groupName = req.body.name;
    var group;
    var groups = [];

    // Add some kind of authentication

    fs.readFile('./server/data/groups.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            res.send(group);
            return
        }
        try {
            groups = JSON.parse(jsonString)
            console.log(groupName);
            for (i in groups) {
                if (groups[i].name == groupName) {
                    group = groups[i]
                    res.send(group);
                    return;
                }
            }
            res.send(group)
        } catch(err) {
            res.send(group);
            console.log('Error parsing JSON string:', err)
        }
    })

    if (!req.body) {
        console.log("Error: no request body")
        return res.sendStatus(400);
    }
}