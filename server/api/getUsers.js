const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/getUsers', user, httpOptions)
module.exports = function(db, app) {
    app.post('/api/getUsers', (req, res) => {
        if (!req.body) {
            console.log("Error: no request body")
            return res.sendStatus(400);
        }
        console.log("GetUsers request recieved")
        const collection = db.collection('users')
        collection.find({}).toArray((err,data) => {
            if (err) throw err;
            res.send(data);
        })
    })
}