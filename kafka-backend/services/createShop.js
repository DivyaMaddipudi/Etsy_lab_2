const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

var Userdb = require("../schema/user");

async function handle_request(msg, callback) {
  console.log("In create shop");
  const shopName = msg.shopName;
  const id = msg.params.id;
  console.log(id);
  Userdb.findByIdAndUpdate(id, { shopName }).then((data) => {
    if (!data) {
      console.log(data + " can't update shopname");
    } else {
      console.log(data);
      callback(null, {
        data,
        message: "Shops Value Inserted in user successfully",
      });
    }
  });
}

exports.handle_request = handle_request;
