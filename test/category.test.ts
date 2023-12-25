import chai from "chai";
import chaiHttp from "chai-http";
import { v4 as uuidv4 } from "uuid";
import { server } from "../src/app";
import prisma from "../src/database/prisma";

// Assertion Style
chai.should();
chai.use(chaiHttp);

const httpServer = server.server;

// `register` and `login` endpoint is calling here, too.
// because of authentication for other endpoints.
describe("Category Endpoints tests", () => {
  let access_token: string;
  let score = 100;
  let testing_user = {
    name: "Test Name",
    family: "Test Family",
    username: "test_username",
    email: "mail@test.com",
    password: "1234",
  };
  let testing_category = {
    id: uuidv4(),
    title: "Test Category",
    score,
    createdAt: new Date(),
  };

  // initial database
  before(async () => {
    // delete test user if exists
    await prisma.user.deleteMany({
      where: {
        OR: [
          { username: testing_user.username },
          { email: testing_user.email },
        ],
      },
    });

    // delete test category if exists
    await prisma.category.deleteMany({
      where: { title: testing_category.title },
    });

    // create test category
    await prisma.category.create({
      data: testing_category,
    });
  });

  // close httpServer`
  after(async () => {
    await httpServer.close();
  });

  // 404 test
  it("It should Return 404 error!", async () => {
    let response = await chai.request(httpServer).get("/wrong");
    response.should.have.status(404);
  });

  // Register (create testing user)
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

  // Login user (to initial access_token)
  it("It should Login a user", async () => {
    let response = await chai.request(httpServer).post("/user/login").send({
      email: testing_user.email,
      password: testing_user.password,
    });
    response.should.have.status(200);
    response.body.should.be.a("object");
    response.body.should.have.property("access_token");
    access_token = response.body.access_token;
    access_token.should.be.a("string");
  });

  // 1. Get all categories
  it("It should GET all categories", async () => {
    let response = await chai
      .request(httpServer)
      .get("/category/all")
      .set("x-uniplato-auth", access_token);
    response.should.have.status(200);
    response.body.should.be.a("array");
  });

  // 2. Get a category by ID
  it("It should GET a category detail", async () => {
    let response = await chai
      .request(httpServer)
      .get(`/category/${testing_category.id}`)
      .set("x-uniplato-auth", access_token);
    response.should.have.status(200);
    response.body.should.be.a("object");
    response.body.should.have.property("id").eq(testing_category.id);
    response.body.should.have.property("title").eq(testing_category.title);
    response.body.should.have.property("score").eq(score);
  });

  // 3. Update score of a category by ID
  it("It should Update score of category", async () => {
    let updated_score = 100;
    let response = await chai
      .request(httpServer)
      .put(`/category/${testing_category.id}`)
      .set("x-uniplato-auth", access_token)
      .send({
        score: updated_score,
      });
    response.should.have.status(200);
    response.body.should.be.a("object");
    response.body.should.have.property("id").eq(testing_category.id);
    response.body.should.have.property("title").eq(testing_category.title);
    response.body.should.have.property("score").eq(updated_score);
    score = updated_score;
  });

  // 4. Increase score of a category by ID
  it("It should Increase score of category", async () => {
    let response = await chai
      .request(httpServer)
      .put(`/category/${testing_category.id}`)
      .set("x-uniplato-auth", access_token)
      .send({
        operation: "increase",
      });
    response.should.have.status(200);
    response.body.should.be.a("object");
    response.body.should.have.property("id").eq(testing_category.id);
    response.body.should.have.property("title").eq(testing_category.title);
    response.body.should.have.property("score").eq(score + 1);
    score += 1;
  });

  // 5. Decrease score of a category by ID
  it("It should Decrease score of category", async () => {
    let response = await chai
      .request(httpServer)
      .put(`/category/${testing_category.id}`)
      .set("x-uniplato-auth", access_token)
      .send({
        operation: "decrease",
      });
    response.should.have.status(200);
    response.body.should.be.a("object");
    response.body.should.have.property("id").eq(testing_category.id);
    response.body.should.have.property("title").eq(testing_category.title);
    response.body.should.have.property("score").eq(score - 1);
    score -= score;
  });
});
