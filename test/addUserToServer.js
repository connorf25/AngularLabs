const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

const app = require('../server/server.js')
const route = '/api/addUserToServer'

let request1 = {username:"TestUser",servername:"Group1"};
let request2 = {username:"NewTestUser",servername:"Group1"};


describe(route, ()=> {
	it('Add a existing user to Server', (done)=> {
        chai.request(app).post(route)
            .send(request1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('num');
                    res.body.should.have.property('err');
                    res.body.num.should.equal(0)
                    done();
                })
    });

    it('Add a new user to server', (done)=> {
        chai.request(app).post(route)
            .send(request2)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('num');
                    res.body.should.have.property('err');
                    res.body.num.should.equal(1)
                    done();
                })
    });
});
