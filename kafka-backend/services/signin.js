var bcrypt = require("bcrypt");
var Userdb = require("../schema/user");

function handle_request(msg, callback) {
  console.log("In finduser post");
  console.log("In handle request:" + JSON.stringify(msg));

  var email = msg.email;
  var password = msg.password;

  console.log(email + " " + password);
  Userdb.findOne({ email: email }).then((user) => {
    console.log(user + "--------------------------");
    if (user) {
      console.log(" user exists");

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          callback(null, { error: err });

          //   res.send({ error: err });
        }
        if (result) {
          console.log(result);
          //   res.cookie("user", user.username, {
          //     maxAge: 900000,
          //     httpOnly: false,
          //     path: "/",
          //   });
          //   session.user = user;
          //   const payload = { _id: user._id, username: user.username };
          //   let token = jwt.sign(payload, process.env.SECRET, {
          //     expiresIn: "1h",
          //   });

          console.log("user " + user);

          callback(null, { success: true, user });
          // res.send(result);
          console.log("=========end =============");
        } else {
          callback(null, {
            message: "Password doesn't match",
          });
          //   res.send({
          //     message: "Password doesn't match",
          //   });
        }
      });
    } else {
      console.log("No user exists");
      callback(null, { message: "No user found!" });
      //   res.send({ message: "No user found!" });
    }
  });
}

exports.handle_request = handle_request;
