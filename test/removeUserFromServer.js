const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

const app = require('../server/server.js')
const route = '/api/removeUserFromServer'

let request = {username:"Test User", servername: "Test 99"};


describe(route, ()=> {
	it('Remove user from server', (done)=> {
        chai.request(app).post(route)
            .send(request)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('err');
                    done();
                })
    });
});
