const fs = require('fs')

module.exports = function(req, res) {
    var customer = {};

    customer.username = req.body.username;
    customer.pw = req.body.pw;
    customer.valid = false;

    fs.readFile('./server/api/users.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            res.send(customer);
            return
        }
        try {
            var users;
            users = JSON.parse(jsonString).users
            console.log(users)
            for (user in users) {
                console.log(users[user])
                if (customer.username == users[user].username && customer.pw == users[user].pw) {
                    customer = { ...users[user] };
                    customer.pw = "";
                    customer.valid = true;
                    break;
                }
            }
            console.log("Sending: ", customer)
            res.send(customer);
    } catch(err) {
            res.send(customer);
            console.log('Error parsing JSON string:', err)
        }
    })

    if (!req.body) {
        console.log("Error: no request body")
        return res.sendStatus(400);
    }
}