import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/app";
import prisma from "../src/database/prisma";

// Assertion Style
chai.should();
chai.use(chaiHttp);

const httpServer = server.server;

describe("User Endpoints tests", () => {
  let testing_user = {
    name: "Alex",
    family: "Green",
    username: "alex_green",
    email: "mail@green.com",
    password: "1234",
  };

  describe("User Register", () => {
    before(async () => {
      // delete user by test's user email or username
      await prisma.user.deleteMany({
        where: {
          OR: [
            { username: testing_user.username },
            { email: testing_user.email },
          ],
        },
      });
    });

    it("It should Register a user", (done) => {
      chai
        .request(httpServer)
        .post("/user/register")
        .send(testing_user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("name");
          res.body.should.have.property("family");
          res.body.should.have.property("username");

          done();
        });
    });
  });

  describe("User Login", () => {
    before(async () => {
      // delete user by test's user email or username
      await prisma.user.deleteMany({
        where: {
          OR: [
            { username: testing_user.username },
            { email: testing_user.email },
          ],
        },
      });

      // create new user by testing_user info
      await prisma.user.create({ data: testing_user });
    });

    it("It should Login a user", (done) => {
      chai
        .request(httpServer)
        .post("/user/login")
        .send({
          email: testing_user.email,
          password: testing_user.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("access_token");
          let access_token = res.body.access_token;
          access_token.should.be.a("string");

          done();
        });
    });
  });
});
