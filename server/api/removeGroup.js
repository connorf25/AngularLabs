const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/removeGroup', {"name": groupName}, { ...httpOptions, responseType: 'text' })
module.exports = function(req, res) {
    console.log("RemoveGroup request recieved")
    var groupName = req.body.name;
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
            console.log(groupName);
            for (i in groups) {
                if (groups[i].name == groupName) {
                    groups.splice(i, 1)
                    console.log('Removed: ', groupName)
                }
            }
            // Write to file
            jsonString = JSON.stringify(groups)
            fs.writeFile('./server/data/groups.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                    res.send("Error writing");
                } else {
                    console.log('Successfully wrote file: removed group')
                    res.send("Successfully removed group");
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