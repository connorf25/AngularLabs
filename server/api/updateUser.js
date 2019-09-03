const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/updateUser', userObject, { ...httpOptions, responseType: 'text' })
module.exports = function(req, res) {
    console.log("UpdateUser request recieved")
    var user = req.body;
    var users = [];

    // Add some kind of authentication

    fs.readFile('./server/data/users.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            res.send("Error reading file");
            return
        }
        try {
            users = JSON.parse(jsonString)
            console.log(user.username);
            for (i in users) {
                if (users[i].username == user.username) {
                    users[i] = user
                    console.log(user)
                    // Write to file
                    jsonString = JSON.stringify(users)
                    fs.writeFile('./server/data/users.json', jsonString, err => {
                        if (err) {
                            console.log('Error writing file', err)
                            res.send("Error writing");
                        } else {
                            console.log('Successfully wrote file: updated user')
                            res.send("Successfully updated user");
                        }
                    })
                    return;
                }
            }
            // user usernname does not exist, add to array
            jsonString = JSON.stringify(users)
            fs.writeFile('./server/data/users.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                    res.send("Error writing");
                } else {
                    console.log('Successfully wrote file: added user')
                    res.send("Successfully added user");
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