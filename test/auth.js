const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

const app = require('../server/server.js')
const route = '/api/auth'

let correctLogin = {username:"TestUser",pw:"123",};
let incorrectLogin = {username:"TestUser",pw:"1234",};


describe(route, ()=> {
	it('Correct Login', (done)=> {
        chai.request(app).post(route)
            .send(correctLogin)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('valid');
                    res.body.valid.should.equal(true)
                    done();
                })
    });

    it('Incorrect Login', (done)=> {
        chai.request(app).post(route)
            .send(incorrectLogin)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('valid');
                    res.body.valid.should.equal(false)
                    done();
                })
    });
});
