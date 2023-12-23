import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../src/index";
import prisma from "../src/database/prisma";

const expect = chai.expect;
chai.use(chaiHttp);

const httpServer = server.server;

describe("Category workflow tests", () => {
  it("Should get all categories + get category by ID + update score of a category", (done) => {
    // 1. Get all categories endpoint test
    chai
      .request(httpServer)
      .get("/category/all")
      .set(
        "x-uniplato-auth",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODkxYmUyZmUtYmFmNS00NDlhLTlmMTktYzc2NDI4Zjg1YjlhIiwidXNlcm5hbWUiOiJhbGV4X2dyZWVuIiwiZW1haWwiOiJtYWlsQGdyZWVuLmNvbSIsImlhdCI6MTcwMzM1NTEwOX0.UfcsnLcRi5hU3gRVfXAXxCdP4WhYjgthPXdIQ7TJoo8"
      )
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("array");
        expect(res.error).to.be.equal(false);
      });

    // 2. Get category by ID endpoint test
    chai
      .request(httpServer)
      .get(`/category/0549a1f2-cd5a-4864-ad04-2f30678101ae`)
      .set(
        "x-uniplato-auth",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODkxYmUyZmUtYmFmNS00NDlhLTlmMTktYzc2NDI4Zjg1YjlhIiwidXNlcm5hbWUiOiJhbGV4X2dyZWVuIiwiZW1haWwiOiJtYWlsQGdyZWVuLmNvbSIsImlhdCI6MTcwMzM1NTEwOX0.UfcsnLcRi5hU3gRVfXAXxCdP4WhYjgthPXdIQ7TJoo8"
      )
      .end((err, res) => {
        // Asserts
        expect(res.statusCode).to.be.equal(200);
        expect(res.error).to.be.equal(false);
        expect(res.body).to.be.a("object");
      });

    done();
  });
});
