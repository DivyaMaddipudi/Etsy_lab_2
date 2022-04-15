// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
var items = require("../schema/items");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

async function handle_request(msg, callback) {
  console.log("In add products to shop");
  const userId = msg.id;

  const itemName = msg.body.itemName;
  const itemDescription = msg.body.itemDescription;
  const itemPrice = msg.body.itemPrice;
  const itemCount = msg.body.itemCount;
  const itemCategory = msg.body.itemCategory;
  const itemImage = msg.file;

  const product = new items({
    userId,
    itemName,
    itemCategory,
    itemPrice,
    itemDescription,
    itemCount,
    itemImage,
  });

  console.log("Products------------------------");
  console.log(product);

  await product
    .save(product)
    .then((data) => {
      console.log("Product added successfully");
      // res.send(data);
      callback(null, { data });
    })
    .catch((err) => {
      console.log(err);
      callback(null, { message: "some error occured" });
      // res.status(500).send({ message: "some error occured" });
    });
}

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

exports.handle_request = handle_request;
