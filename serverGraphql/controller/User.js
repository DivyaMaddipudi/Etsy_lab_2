const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const session = require("express-session");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

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

//connect to s3 bucket

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

//create and save new user
exports.create = async (username, email, password) => {
  console.log("======================== in create");
  return new Promise(async (resolve, reject) => {
    console.log("In register post " + username);
    //validate request
    console.log(username + " --------------- ");
    if (!username && !email && !password) {
      reject({ message: "Content can not be empty" });
      return;
    }
    //new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Userdb({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // save user in the db
    user
      .save(user)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject({ message: "some error occured" });
      });
  });
};

exports.findUser = (req, res) => {
  console.log("In finduser post");

  console.log(req + " " + res);
  var email = req.body.email;
  var password = req.body.password;
  Userdb.findOne({ email: email }).then((user) => {
    console.log(user + "--------------------------");
    if (user) {
      console.log(" user exists");

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          res.send({ error: err });
        }
        if (result) {
          res.cookie("user", user.username, {
            maxAge: 900000,
            httpOnly: false,
            path: "/",
          });
          session.user = user;
          const payload = { _id: user._id, username: user.username };
          let token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1h",
          });

          res.cookie("token", token, {
            maxAge: 900000,
            httpOnly: false,
            path: "/",
          });

          console.log("result " + result + " token " + token);

          resolve({ success: true, user, token });
          // res.send(result);
          console.log("=========end =============");
        } else {
          reject({
            message: "Password doesn't match",
          });
        }
      });
    } else {
      console.log("No user exists");
      reject({ message: "No user found!" });
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

exports.findShopDuplicates = (shopName) => {
  // const shopName = req.body.shopName;
  return new Promise(async (resolve, reject) => {
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
  });
};

exports.createShop = (req, res) => {
  console.log("In create shop");
  const shopName = req.body.shopName;
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, { shopName }).then((data) => {
    if (!data) {
      console.log(data + " can't update shopname");
    } else {
      console.log(data);
      res.send({ data, message: "Shops Value Inserted in user successfully" });
    }
  });
};

exports.getShopById = (req, res) => {
  console.log("------------------ get shop by id ---------------------");
  const userId = req.params.id;
  console.log(userId);
  Userdb.findById({ _id: userId }).then((user) => {
    if (user) {
      console.log(user);
      res.send({ user, success: true });
    } else {
      res.send({
        message: "No user exists",
      });
    }
  });
};

exports.updateUser = (req, res) => {
  console.log("In update user details");
  const userId = req.params.id;

  const uploadSingle = upload("etsyappstoragelab").single("userImage");

  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    console.log(req.file);
    // console.log(req.file.location);
    console.log("-----------------------------------");
    console.log(req.body);

    const userName = req.body.userName;
    const gender = req.body.gender;
    const city = req.body.city;
    const fullAddress = req.body.fullAddress;
    const dob = req.body.dob;
    const about = req.body.about;
    const phoneNumber = req.body.phoneNumber;
    const profilePic = req.file.location;

    await Userdb.findByIdAndUpdate(userId, {
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
        res.send({ success: true, result, profilePic });
      })
      .catch((err) => {
        console.log(
          "--------------------------------not updated results -------------" +
            err
        );
        res.send({ message: "User not updated", err });
      });
  });
};

exports.updateUserAddress = (req, res) => {
  const fullAddress = req.body.fullAddress;
  const about = req.body.about;
  const city = req.body.city;

  const id = req.params.id;

  console.log(fullAddress);
  console.log(about);
  console.log(city);

  Userdb.findByIdAndUpdate(
    { _id: id },
    { fullAddress: fullAddress, about: about, city: city }
  ).then((data) => {
    if (!data) {
      console.log(data + " can't update shipping address");
    } else {
      console.log(data);
      console.log("address updated successfully");
      res.send({ success: true, data });
    }
  });
};

exports.updateShopImageById = (req, res) => {
  console.log("In update shop image");
  const shopName = req.body.shopName;
  const id = req.params.id;
  const uploadSingle = upload("etsyappstoragelab").single("shopImage");
  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err });
    console.log(req.file + "===================");
    await Userdb.findByIdAndUpdate(
      { _id: id },
      { shopImage: req.file.location }
    ).then((data) => {
      if (!data) {
        console.log(data + " can't update shopname");
      } else {
        console.log(data);
        console.log("Image uploaded successfully");
        res.send({ success: true, data });
      }
    });
  });

  // Userdb.findByIdAndUpdate(id, { shopName }).then((data) => {
  //   if (!data) {
  //     console.log(data + " can't update shopname");
  //   } else {
  //     console.log(data);
  //     res.send("Shops Value Inserted in user successfully");
  //   }
  // });
  console.log(shopName + " " + id);
};

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });
