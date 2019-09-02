const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/updateUsers', users, { ...httpOptions, responseType: 'text' })
module.exports = function(req, res) {
    console.log("Update Users request recieved")
    var users = req.body;

    var jsonString = JSON.stringify(users)
    fs.writeFile('./server/api/users.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
            res.send("Error writing");
        } else {
            console.log('Successfully wrote file')
            res.send("Users updated");
        }
    })


    if (!req.body) {
        console.log("Error: no request body")
        return res.sendStatus(400);
    }
}