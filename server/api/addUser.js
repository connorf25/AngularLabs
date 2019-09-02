const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/addUser', newuser, httpOptions)
module.exports = function(req, res) {
    console.log("Newuser request recieved")
    var newuser = req.body;
    var users;
    // Add some kind of authentication

    fs.readFile('./server/api/users.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            res.send("Error reading file from disk");
            return
        }
        try {
            users = JSON.parse(jsonString).users
            console.log(users)
            
            users.push(newuser)
            console.log("Added: ", newuser)

            jsonString = JSON.stringify(users)
            fs.writeFile('./server/api/users.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                    res.send("Error writing");
                } else {
                    console.log('Successfully wrote file')
                    res.send("User added");
                }
            })
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