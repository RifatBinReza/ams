//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

//TODO: Add more test cases for failed events and required parameters or query validations.

describe('user', ()=>{
  /**
   * Test login route
   */
  describe("LOGIN user", () => {
    it("it should POST a user login request", (done) => {
      let user = {
        email: "rifatbinreza@gmail.com",
        password: "Test1234"
      };

      chai
        .request(server)
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
})