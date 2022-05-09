const { json } = require("body-parser");
const mysql = require("mysql");
const constants = require("../config/config.json");
const Users = require("../models");
const session = require("express-session");

const db = mysql.createConnection({
  host: constants.development.host,
  user: constants.development.username,
  password: constants.development.password,
  port: constants.development.port,
  database: constants.development.database,
});

exports.sayHi = (req, res) => {
  const listOfUsers = db.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.signUp = (req, res) => {
  const username = req.body.username;
  console.log(username);
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("In login post req");
  console.log(email + " " + password + " email body");
  db.query(
    "SELECT * FROM Users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      console.log(
        "res length------------" + result + "=======" + result.length
      );
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.cookie("emailCookie", "cookie", {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        res.send(result);
      } else {
        res.send({ message: "Invalid creds" });
      }
    }
  );
};
