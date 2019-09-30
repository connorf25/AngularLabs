const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/removeUserFromServer', {username, servername}, { ...httpOptions, responseType: 'text' })
// Adds server to user groupList, still need to update group seperately
module.exports = function(db, app) {
    app.post('/api/removeUserFromServer', (req, res) => {
        console.log("RemoveUserFromServer request recieved")
        var username = req.body.username;
        var servername = req.body.servername
        const users_collection = db.collection('users');

        users_collection.updateOne(
            {username: username},
            {$pull: { groupList: servername }}
        )
    })
}