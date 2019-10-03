const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

var ObjectID = require('mongodb').ObjectID;

const app = require('../server/server.js')
const route = '/api/updateGroups'

let groups = [
    {
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
                }
        ],
        "allUsers" : [
                "super",
                "New"
        ]
    }
]

describe(route, ()=> {
	it('Reset groups list', (done)=> {
        chai.request(app).post(route)
            .send(groups)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.equal("Groups updated")
                    done();
                })
    });
});
