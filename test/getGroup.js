const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

const app = require('../server/server.js')
const route = '/api/getGroup'

let group = {name:"Test 99"};
let noGroup = {name:"NoExistingGroup"};


describe(route, ()=> {
	it('Existing group', (done)=> {
        chai.request(app).post(route)
            .send(group)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('name');
                    res.body.name.should.equal(group.name)
                    done();
                })
    });

    it('Non-existant group', (done)=> {
        chai.request(app).post(route)
            .send(noGroup)
                .end((err, res) => {
                    console.log(res)
                    res.should.have.status(200);
                    done();
                })
    });
});
