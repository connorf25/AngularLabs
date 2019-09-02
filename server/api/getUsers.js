const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/getUsers', user, httpOptions)
module.exports = function(req, res) {
    console.log("GetUsers request recieved")
    var requestuser = req.body;
    var users;

    // Add some kind of authentication

    fs.readFile('./server/data/users.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            res.send(users);
            return
        }
        try {
            users = JSON.parse(jsonString)
            console.log(users)
            
            res.send(users);
            
        } catch(err) {
            res.send(users);
            console.log('Error parsing JSON string:', err)
        }
    })

    if (!req.body) {
        console.log("Error: no request body")
        return res.sendStatus(400);
    }
}