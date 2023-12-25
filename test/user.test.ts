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
    name: "Alex (test user)",
    family: "Green",
    username: "alex_green",
    email: "mail@green.com",
    password: "1234",
  };

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

  after(async () => {
    await httpServer.close();
  });

  // 1. Test 404
  it("It should Return 404 error!", async () => {
    let response = await chai.request(httpServer).get("/wrong");
    response.should.have.status(404);
  });

  // 2. Test Register
  it("It should Register a user", async () => {
    let response = await chai
      .request(httpServer)
      .post("/user/register")
      .send(testing_user);
    response.should.have.status(201);
    response.body.should.be.a("object");
    response.body.should.have.property("id");
    response.body.should.have.property("name").eq(testing_user.name);
    response.body.should.have.property("family").eq(testing_user.family);
    response.body.should.have.property("email").eq(testing_user.email);
    response.body.should.have.property("username").eq(testing_user.username);
  });

  // 3. Test Login
  it("It should Login a user", async () => {
    let response = await chai.request(httpServer).post("/user/login").send({
      email: testing_user.email,
      password: testing_user.password,
    });
    response.should.have.status(200);
    response.body.should.be.a("object");
    response.body.should.have.property("access_token");
    let access_token = response.body.access_token;
    access_token.should.be.a("string");
  });
});
