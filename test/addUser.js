const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

const app = require('../server/server.js')
const route = '/api/addUser'

let newUser = {username:"TestUser",email:"testing@gmail.com",pw:"123",supp:true,ofGroupAdminsRole:true,groupList:[]};

describe(route, ()=> {
	it('Add a new user', (done)=> {
        chai.request(app).post(route)
            .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('num');
                    res.body.should.have.property('err');
                    done();
                })
    });

    it('Should not add duplicate username', (done)=> {
        chai.request(app).post(route)
            .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('num');
                    res.body.should.have.property('err');
                    res.body.err.should.equal('Username already exists')
                    done();
                })
    });
});
