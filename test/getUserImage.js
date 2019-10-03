const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

const app = require('../server/server.js')
const route = '/api/getUserImage'

let user = {username:"super"};
let noUser = {name:"NoExistingUser"};


describe(route, ()=> {
	it('User exists', (done)=> {
        chai.request(app).post(route)
            .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('image');
                    console.log(res.body.image)
                    done();
                })
    });

    it('Non-existant user', (done)=> {
        chai.request(app).post(route)
            .send(noUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('image');
                    console.log(res.body.image)
                    done();
                })
    });
});
