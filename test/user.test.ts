import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/index";
import prisma from "../src/database/prisma";

const expect = chai.expect;
chai.use(chaiHttp);

const httpServer = server.server;

describe("User workflow tests", () => {
  it("Should register + login a user", (done) => {
    // 1. Register endpoint test
    let user = {
      name: "Peter",
      family: "Petersen",
      username: "peter_petersen",
      email: "mail@petersen.com",
      password: "1234",
    };
    chai
      .request(httpServer)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a("object");
        expect(res.error).to.be.equal(false);
      });

    // 2. Login endpoint test
    let user_info = {
      email: "mail@petersen.com",
      password: "1234",
    };
    chai
      .request(httpServer)
      .post("/user/login")
      .send(user_info)
      .end((err, res) => {
        // Asserts
        expect(res.statusCode).to.be.equal(200);
        expect(res.error).to.be.equal(false);
        expect(res.body).to.be.a("object");
        let access_token = res.body.access_token;
        expect(access_token).to.be.a("string");
      });

    done();
  });
});
