const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

const app = require('../server/server.js')
const route = '/api/getUsers'

let isSuper = {supp:true};
let isNotSuper = {supp:false};


describe(route, ()=> {
	it('Super user request for users', (done)=> {
        chai.request(app).post(route)
            .send(isSuper)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
    });

    it('Normal user request for users', (done)=> {
        chai.request(app).post(route)
            .send(isNotSuper)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('err');
                    res.body.err.should.equal('Invalid permissions');
                    done();
                })
    });
});
