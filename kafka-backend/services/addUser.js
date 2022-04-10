const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

var Userdb = require("../schema/user");

async function handle_request(msg, callback) {
  console.log("In register post");
  //validate request
  console.log(msg.username + " --------------- ");
  if (!msg) {
    callback(null, { message: "Content can not be empty" });
    return;
  }

  //new user
  const hashedPassword = await bcrypt.hash(msg.password, 10);

  const user = new Userdb({
    username: msg.username,
    email: msg.email,
    password: hashedPassword,
  });

  // save user in the db
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      callback(null, { status: 200, data });
    })
    .catch((err) => {
      console.log(err);
      callback(null, { status: 200, response: {} });

      // res.status(500).send({ message: "some error occured" });
    });
}

exports.handle_request = handle_request;
