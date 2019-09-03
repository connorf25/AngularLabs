const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/removeUserFromServer', {username, servername}, { ...httpOptions, responseType: 'text' })
// Adds server to user groupList, still need to update group seperately
module.exports = function(req, res) {
    console.log("RemoveUserFromServer request recieved")
    var username = req.body.username;
    var servername = req.body.servername
    var users;
    // Add some kind of authentication

    fs.readFile('./server/data/users.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            res.send("Error reading file from disk");
            return
        }
        try {
            users = JSON.parse(jsonString)

            for (i in users) {
                if (username == users[i].username) {
                    console.log("User found")
                    for( x in users[i].groupList){ 
                        if ( users[i].groupList[x] == servername) {
                            users[i].groupList.splice(x, 1); 
                            console.log("Removed server from grouplist")
                        }
                     }
                    // Write changes to server
                    jsonString = JSON.stringify(users)
                    fs.writeFile('./server/data/users.json', jsonString, err => {
                        if (err) {
                            console.log('Error writing file', err)
                            res.send("Error writing updated user");
                        } else {
                            console.log('Successfully wrote file')
                            res.send("Updated GroupList")
                        }
                    })
                    return;
                }
            }
        } catch(err) {
            res.send('Error parsing JSON string');
            console.log('Error parsing JSON string:', err)
        }
    })

    if (!req.body) {
        console.log("Error: no request body")
        return res.sendStatus(400);
    }
}