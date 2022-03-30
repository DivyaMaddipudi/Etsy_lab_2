const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Userdb = require("../models/model");

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
          res.json({ error: err });
        }
        if (result) {
          res.cookie("user", result[0].name, {
            maxAge: 900000,
            httpOnly: false,
            path: "/",
          });
          req.session.user = result;
          let token = jwt.sign({ email: user.email }, "SecretValue", {
            expiresIn: "1h",
          });
          // res.json({ message: "Login successfull", token });
          res.send(result);
        } else {
          res.json({
            message: "Password doesn't match",
          });
        }
      });
    } else {
      res.json({ message: "No user found!" });
    }
  });
};

exports.getSignIn = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};
