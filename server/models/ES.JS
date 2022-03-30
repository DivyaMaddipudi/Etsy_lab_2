var assert = require("chai").assert;
var app = require("../index");
var chai = require("chai");
var expect = require("chai").expect;
//var agent = chai.request.agent(app);
ROOT_URL = "http://localhost:4000";
chai.use(require("chai-http"));

describe("Post Signin", () => {
  it("/signin", (done) => {
    chai.request
      .agent(app)
      .post("/signin")
      .send({ email: "asha@gmail.com", password: "yalla" })
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Post Register", () => {
  it("/register", (done) => {
    chai.request
      .agent(app)
      .post("/register")
      .send({ email: "asha@gmail.com", password: "yalla", username: "asha" })
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Get User", () => {
  it("/user", (done) => {
    chai.request
      .agent(app)
      .post("/user")
      .send({ user: "asha" })
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(404);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Duplicate Shop", () => {
  it("/findShopDuplicates", (done) => {
    chai.request
      .agent(app)
      .post("/findShopDuplicates")
      .send({ shopName: "ashashop" })
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Create Shop", () => {
  it("/createShop", (done) => {
    chai.request
      .agent(app)
      .post("/createShop/10")
      .send({ shopName: "ashashop" })
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
