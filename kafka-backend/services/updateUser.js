// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const aws = require("aws-sdk");
const multer = require("multer");
var user = require("../schema/user");

async function handle_request(msg, callback) {
  console.log("In add products to shop");
  const userId = msg.id;

  const userName = msg.body.userName;
  const gender = msg.body.gender;
  const city = msg.body.city;
  const fullAddress = msg.body.fullAddress;
  const dob = msg.body.dob;
  const about = msg.body.about;
  const phoneNumber = msg.body.phoneNumber;
  const profilePic = msg.file;

  const userObj = {
    userName: msg.body.userName,
    gender: msg.body.gender,
    city: msg.body.city,
    fullAddress: msg.body.fullAddress,
    dob: msg.body.dob,
    about: msg.body.about,
    phoneNumber: msg.body.phoneNumber,
    profilePic: msg.file,
  };

  await user
    .findByIdAndUpdate(userId, {
      username: userName,
      gender,
      city,
      dob,
      fullAddress,
      about,
      phoneNumber,
      profilePic,
    })
    .then((result) => {
      console.log(
        "--------------------------------user updated results -------------"
      );
      console.log(result);
      //   res.send({ success: true, result, profilePic });
      callback(null, { userObj });
    })
    .catch((err) => {
      console.log(
        "--------------------------------not updated results -------------" +
          err
      );
      callback(null, { message: "User not updated", err });

      //   res.send({ message: "User not updated", err });
    });
}

exports.handle_request = handle_request;
