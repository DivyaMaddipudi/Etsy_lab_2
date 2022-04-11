const chai = require("chai");
const server = require("../server");
const chaiHttp = require("chai-http");
const delay = require("delay");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe("Get Items", () => {
  // test get items

  describe("GET /api/products/getItems", () => {
    it("It should GET all the products", (done) => {
      chai
        .request(server)
        .get("/api/products/getItems")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.length.should.be.eq(1);
        });
      done();
    });
    it("It should not GET all the products", (done) => {
      chai
        .request(server)
        .get("/api/products/getIte")
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });

  // test get items by id
  describe("GET /api/products/getItemById/:itemId", () => {
    it("It should GET all the products based on Id", (done) => {
      chai
        .request(server)
        .get("/api/products/getItemById/6253485f7745e7a3afaa4fc7")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.length.should.be.eq(1);
        });
      done();
    });
    it("It should not GET all the products based on Id", (done) => {
      chai
        .request(server)
        .get("/api/products/getItemById/2")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
        });
      done();
    });
  });
  // test add item to favourites
  describe("POST /api/products/addFavourite", () => {
    it("It should ADD item to favourites", (done) => {
      const product = {
        itemId: "6253485f7745e7a3afaa4fc7",
        userId: "625312b20d50b50b4fb0b47e",
      };
      chai
        .request(server)
        .post("/api/products/addFavourite")
        .send(product)
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });

  //   test shop duplicates
  describe("POST /api/users/findShopDuplicate", () => {
    it("It should NOT FIND shop duplicates", (done) => {
      const shopName = "DivyaShop";
      chai
        .request(server)
        .get("/api/users/findShopDuplicate")
        .send(shopName)
        .end((err, response) => {
          response.should.have.status(404);
        });
      done();
    });
  });
});
