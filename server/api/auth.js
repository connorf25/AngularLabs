users = [
    {"username": "abc", "pw": "123", "birthdate": "1997-10-22", "age": 23, "email": "abc@gmail.com"},
    {"username": "test", "pw": "123456", "birthdate": "1917-10-22", "age": 93, "email": "test@gmail.com"},
    {"username": "admin", "pw": "password", "birthdate": "2010-10-22", "age": 9, "email": "admin@company.com"}
]

module.exports = function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var customer = {};
    customer.username = req.body.username;
    customer.pw = req.body.pw;
    customer.valid = false;
    for (user in this.users) {
        console.log(users[user])
        if (customer.username == this.users[user].username && customer.pw == this.users[user].pw) {
            customer = { ...this.users[user] };
            customer.pw = "";
            customer.valid = true;
            break;
        }
    }
    res.send(customer);
    console.log(customer);
}