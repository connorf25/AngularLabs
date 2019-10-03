const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

const app = require('../server/server.js')
const route = '/api/removeGroup'

let request = {name:"Test Group"};


describe(route, ()=> {
	it('Delete group', (done)=> {
        chai.request(app).post(route)
            .send(request)
                .end((err, res) => {
                    console.log(res.body)
                    res.should.have.status(200);
                    res.body.should.have.property('err');
                    done();
                })
    });
});
