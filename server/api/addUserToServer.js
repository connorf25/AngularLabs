const fs = require('fs')
// Usage: this.httpClient.post('http://localhost:3000/api/addUserToServer', {username, servername}, { ...httpOptions, responseType: 'text' })
// Adds server to user groupList, still need to update group seperately
module.exports = function(db, app, ObjectID) {
    app.post('api/addUserToServer', (req, res) => {
        if (!req.body) {
            return res.sendStatus(400)
        }

        var username = req.username
        var servername = req.servername
        console.log("Adding: ", username, " to: ", servername)

        const collection = db.collection('users');

        collection.find({'username': username}).count((err,count) => {
            if (count == 0) {
                // No user exists, insert
                var newuser = {
                    id: ObjectID(),
                    username: username,
                    email: "",
                    pw: "",
                    supp: false,
                    ofGroupAdminsRole: false,
                    groupList: [ servername ]
                }
                collection.insertOne(newuser, (err,dbres) => {
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num': num, err: null})
                })
                // TODO Add to server
            } else {
                // TODO User Exists, add to server
                res.send({num:0, err:"duplicate item"});
            }
        })
    })

    console.log("AddUserToServer request recieved")
    var input = req.body;
    var username = input.username
    var servername = input.servername
    var users;
    // Add some kind of authentication
    console.log("Adding: ", username, " to: ", servername)

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
                    console.log("User already exists")
                    users[i].groupList.push(servername)
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
            var newuser = {
                username: username,
                email: "",
                pw: "",
                supp: false,
                ofGroupAdminsRole: false,
                groupList: [ servername ]
            }
            console.log("User does not exist, adding user")
            users.push(newuser)
            console.log("Added: ", newuser)

            jsonString = JSON.stringify(users)
            fs.writeFile('./server/data/users.json', jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                    res.send("Error writing new user");
                } else {
                    console.log('Successfully wrote file')
                    res.send("New User added to server");
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