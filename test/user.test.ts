import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/index";

const expect = chai.expect;
chai.use(chaiHttp);

describe("User workflow tests", () => {
  it("Should register + login a user", (done) => {
    // 1) Register new user
    let user = {
      name: "Peter",
      family: "Petersen",
      username: "peter_petersen",
      email: "mail@petersen.com",
      password: "1234",
    };
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // 2) Login the user
        chai
          .request(server)
          .post("/user/login")
          .send({
            email: "mail@petersen.com",
            password: "1234",
          })
          .end((err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            let access_token = res.body.data.access_token;
          });
      });
  });
});
