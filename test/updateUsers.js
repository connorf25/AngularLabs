const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

var ObjectID = require('mongodb').ObjectID;

const app = require('../server/server.js')
const route = '/api/updateUsers'

let users = [
    {
        "_id" : ObjectID("5d920efef97fcc30e81f8a43"),
        "username" : "super",
        "email" : "super@gmail.com",
        "pw" : "123",
        "supp" : true,
        "ofGroupAdminsRole" : true,
        "groupList" : [
                "Test 99"
        ]
    },
    {
        "_id" : ObjectID("5d920f32f94ab72188be24e5"),
        "username" : "New",
        "email" : "",
        "pw" : "",
        "supp" : false,
        "ofGroupAdminsRole" : false,
        "groupList" : [
                "Test 99"
        ]
    }
]

describe(route, ()=> {
	it('Reset users list', (done)=> {
        chai.request(app).post(route)
            .send(users)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.equal("Users updated")
                    done();
                })
    });
});
