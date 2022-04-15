//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var kafka = require("./kafka/client");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const formidable = require("formidable");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

//Allow Access Control

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//Route to get All Books when user visits the Home Page
app.get("/books", function (req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end("Hello");
});

app.post("/api/users/register", function (req, res) {
  console.log(req.body + " IN USER REGISTER POST");
  kafka.make_request("addUser", req.body, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log(req.body.email + " ----------------------------------");
    console.log(req.body.username + " ----------------------------------");
    console.log("in result");
    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      console.log(results);
      res.json({
        updatedList: results,
      });

      res.end();
    }
  });
});

// app.post("/api/users/signin", function (req, res) {
//   console.log(req.body + " IN USER signin POST");
//   kafka.make_request("add_user", req.body, function (err, results) {
//     console.log(req.body + " ----------------------------------");
//     console.log(req.body.email + " ----------------------------------");
//     console.log(req.body.username + " ----------------------------------");
//     console.log("in result");
//     if (err) {
//       console.log(err);
//       console.log("Inside err");
//       res.json({
//         status: "error",
//         msg: "System Error, Try Again.",
//       });
//     } else {
//       console.log("Inside else");
//       console.log(results);
//       if (results.success === true) {
//         res.cookie("user", results.user.username, {
//           maxAge: 900000,
//           httpOnly: false,
//           path: "/",
//         });
//         session.user = results.user;
//         const payload = {
//           _id: results.user._id,
//           username: results.user.username,
//         };
//         let token = jwt.sign(payload, "SECRETVALUE", {
//           expiresIn: "1h",
//         });
//         console.log("result " + result + " token " + token);
//         callback(null, {
//           success: true,
//           user,
//           token: "JWT " + token,
//         });
//       }
//       res.json({
//         updatedList: results,
//       });
//       res.end();
//     }
//   });
// });

app.get("/api/products/getFavourites/:id", function (req, res) {
  console.log(req.body + " IN ADD TO CART");
  const reqParams = {
    id: req.params.id,
  };
  kafka.make_request("getFavourites", reqParams, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log("in result");
    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else----------");
      console.log(results);
      res.json({
        result: results,
      });
      res.end();
    }
  });
});

app.post("/api/products/addProduct/:id", function (req, res) {
  console.log(" Add Product to shop ");

  const uploadSingle = upload("etsyappstorage").single("itemImage");

  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    const reqValues = {
      id: req.params.id,
      body: req.body,
      file: req.file.location,
    };

    // console.log(reqValues);
    kafka.make_request("addToShop", reqValues, function (err, results) {
      console.log("in result");
      if (err) {
        console.log(err);
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        console.log("Inside else");
        console.log(results);
        res.json({
          updatedList: results,
        });
        res.end();
      }
    });
  });

  console.log(" Add Product to shop----------------------------- ");
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `ProductImage-${Date.now()}.jpeg`);
      },
    }),
  });

app.post("/api/products/addToCart", function (req, res) {
  console.log(req.body + " IN ADD TO CART");
  kafka.make_request("addToCart", req.body, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log("in result");
    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      console.log(results);
      res.json({
        updatedList: results,
      });

      res.end();
    }
  });
});

//start your server on port 3001
app.listen(4001);
console.log("Server Listening on port 4001");
