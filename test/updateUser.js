const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

var ObjectID = require('mongodb').ObjectID;

const app = require('../server/server.js')
const route = '/api/updateUser'

let user = {
    "username" : "TestUser",
    "email" : "testing@gmail.com",
    "pw" : "123",
    "supp" : true,
    "ofGroupAdminsRole" : true,
    "groupList" : [
            "RemovedGroups"
    ]
}

let noUser = {
    "username" : "Non-existing TestUser",
    "email" : "testing@gmail.com",
    "pw" : "123",
    "supp" : true,
    "ofGroupAdminsRole" : true,
    "groupList" : [
            "RemovedGroups"
    ]
}

describe(route, ()=> {
	it('Update existing user', (done)=> {
        chai.request(app).post(route)
            .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.equal("User updated")
                    done();
                })
    });

    it('Add new user', (done)=> {
        chai.request(app).post(route)
            .send(noUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.equal("User added")
                    done();
                })
    });
});
