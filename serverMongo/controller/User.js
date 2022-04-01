const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const session = require("express-session");

var Userdb = require("../models/model");

const sessionRouter = express.Router();

sessionRouter.use(
  session({
    key: "email",
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    // duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
    cookie: {
      expiresIn: 60 * 60 * 24,
    },
  })
);

//create and save new user
exports.create = async (req, res) => {
  console.log("In register post");
  //validate request
  console.log(req.body.username + " --------------- ");
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  //new user
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new Userdb({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  // save user in the db
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "some error occured" });
    });
};

exports.findUser = (req, res) => {
  console.log("In finduser post");

  var email = req.body.email;
  var password = req.body.password;

  console.log(email + " " + password);
  Userdb.findOne({ email: email }).then((user) => {
    console.log(user + "--------------------------");
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.send({ error: err });
        }
        if (result) {
          res.cookie("user", user.username, {
            maxAge: 900000,
            httpOnly: false,
            path: "/",
          });
          session.user = user;
          let token = jwt.sign({ username: user.username }, "SecretValue", {
            expiresIn: "1h",
          });

          console.log("result " + result);

          res.send({ success: true, user, token });
          // res.send(result);
          console.log("=========end =============");
        } else {
          res.send({
            message: "Password doesn't match",
          });
        }
      });
    } else {
      res.send({ message: "No user found!" });
    }
  });
};

exports.getSignIn = (req, res) => {
  console.log("---------------session user----------------");
  if (session.user) {
    console.log(session.user);
    console.log("---------------session user exist----------------");
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

exports.findShopDuplicates = (req, res) => {
  const shopName = req.body.shopName;

  Userdb.findOne({ shopName: shopName }).then((user) => {
    if (user) {
      res.send({
        message: "duplicate",
      });
      console.log("In shops db shop name found");
    } else {
      res.send({
        message: "No duplicates",
      });
      console.log("In shops db and no shop name found");
    }
  });
};

exports.createShop = (req, res) => {
  const shopName = req.body.shopName;
  const id = req.params.id;

  Userdb.findByIdAndUpdate(id, { shopName }).then((data) => {
    if (!data) {
      console.log(data + " can't update shopname");
    } else {
      console.log(data);
      res.send("Shops Value Inserted in user successfully");
    }
  });
  console.log(shopName + " " + id);
};
