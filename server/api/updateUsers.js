const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/updateUsers', users, { ...httpOptions, responseType: 'text' })
module.exports = function(db, app) {
    app.post('api/updateUsers', (req, res) => {
        if (!req.body) {
            console.log("Error: no request body")
            return res.sendStatus(400);
        }
        console.log("Update Users request recieved, currently does nothing")
        var users = req.body;
    })
}