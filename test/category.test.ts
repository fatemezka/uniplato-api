import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/app";

// Assertion Style
chai.should();
chai.use(chaiHttp);

const httpServer = server.server;

describe("Category Endpoints tests", () => {
  describe("Login and Get /category/all", () => {
    it("It should GET all categories", (done) => {
      chai
        .request(httpServer)
        .post("/user/login")
        .send({
          email: "mail@green.com",
          password: "1234",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          let access_token = res.body.access_token;
          access_token.should.be.a("string");

          chai
            .request(httpServer)
            .get("/category/all")
            .set("x-uniplato-auth", access_token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("array");
            });

          done();
        });
    });

    it("It should NOT GET all categories", (done) => {
      chai
        .request(httpServer)
        .post("/user/login")
        .send({
          email: "mail@green.com",
          password: "1234",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          let access_token = res.body.access_token;
          access_token.should.be.a("string");

          chai
            .request(httpServer)
            .get("/categoryy/all")
            .set("x-uniplato-auth", access_token)
            .end((err, res) => {
              res.should.have.status(404);
            });

          done();
        });
    });
  });
});
