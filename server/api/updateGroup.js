const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/updateGroup', groupObject, { ...httpOptions, responseType: 'text' })
module.exports = function(req, res) {
    console.log("UpdateGroup request recieved")
    var group = req.body;
    var groups = [];

    // Add some kind of authentication

    fs.readFile('./server/data/groups.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            res.send("Error reading file");
            return
        }
        try {
            groups = JSON.parse(jsonString)
            console.log(group.name);
            for (i in groups) {
                if (groups[i].name == group.name) {
                    groups[i] = group
                    console.log(group)
                    // Write to file
                    jsonString = JSON.stringify(groups)
                    fs.writeFile('./server/data/groups.json', jsonString, err => {
                        if (err) {
                            console.log('Error writing file', err)
                            res.send("Error writing");
                        } else {
                            console.log('Successfully wrote file: updated group')
                            res.send("Successfully updated group");
                        }
                    })
                    return;
                }
            }
            // Group name does not exist, add to array
            groups.push(group)
            // Write to file
            jsonString = JSON.stringify(groups)
            fs.writeFile('./server/data/groups.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                    res.send("Error writing");
                } else {
                    console.log('Successfully wrote file: added group')
                    res.send("Successfully added group");
                }
            })
            return;
            
        } catch(err) {
            res.send("Error parsing JSON");
            console.log('Error parsing JSON string:', err)
            return
        }
    })

    if (!req.body) {
        console.log("Error: no request body")
        return res.sendStatus(400);
    }
}