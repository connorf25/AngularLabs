const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

var ObjectID = require('mongodb').ObjectID;

const app = require('../server/server.js')
const route = '/api/updateGroup'

let group = {
    "_id" : ObjectID("5d920f2cf94ab72188be24e4"),
    "name" : "Test 99",
    "groupAdmin" : "super",
    "groupAssis" : [ ],
    "channels" : [
            {
                    "name" : "Channel 1",
                    "users" : [
                            "New"
                    ]
            },
            {
                    "name" : "Channel 2",
                    "users" : [ ]
            },
            {
                "name" : "TestChannel",
                "users" : [ ]
            }
    ],
    "allUsers" : [
            "super",
            "New"
    ]
}

let noGroup = {
    "name" : "New Test Group",
    "groupAdmin" : "super",
    "groupAssis" : [ ],
    "channels" : [
            {
                "name" : "TestChannel",
                "users" : [ ]
            }
    ],
    "allUsers" : [
            "super",
            "New"
    ]
}

describe(route, ()=> {
	it('Update existing group', (done)=> {
        chai.request(app).post(route)
            .send(group)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.equal("Group updated")
                    done();
                })
    });

    it('Add new group', (done)=> {
        chai.request(app).post(route)
            .send(noGroup)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.equal("Successfully added group")
                    done();
                })
    });
});
