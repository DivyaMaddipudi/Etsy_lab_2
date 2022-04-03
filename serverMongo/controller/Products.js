const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const uploadImage = require("../controller/User");
var items = require("../models/items");
const json = require("formidable/src/plugins/json");

// const productRouter = express.Router();

//connect to s3 bucket

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

exports.addProduct = (req, res) => {
  console.log("In add products");
  const userId = req.params.id;

  // console.log(userId);
  // console.log(itemName);
  // console.log(itemDescription);
  // console.log(itemPrice);
  // console.log(itemCount);
  // console.log(itemCategory);

  const uploadSingle = upload("etsyappstorage").single("itemImage");

  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    console.log(req.file);
    console.log(req.file.location);
    console.log("-----------------------------------");
    console.log(req.body);

    const itemName = req.body.itemName;
    const itemDescription = req.body.itemDescription;
    const itemPrice = req.body.itemPrice;
    const itemCount = req.body.itemCount;
    const itemCategory = req.body.itemCategory;
    const itemImage = req.file.location;

    const product = new items({
      userId,
      itemName,
      itemCategory,
      itemPrice,
      itemDescription,
      itemCount,
      itemImage,
    });

    await product
      .save(product)
      .then((data) => {
        console.log("Product added successfully");
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "some error occured" });
      });
  });
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
        cb(null, `ProductImage-${Date.now()}.jpeg`);
      },
    }),
  });

exports.getAllProducts = async (req, res) => {
  console.log(
    "++++++++++++++++++++++++ In get all products +++++++++++++++++++++++++++++"
  );
  const userId = req.params.id;
  console.log(userId);
  await items
    .find({ userId: userId })
    .then((products) => {
      console.log(products);
      res.send({ success: true, result: products });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Unable to fetch products by specific id",
      });
    });
};

exports.getItemsByItemSearchId = async (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);
  await items
    .find({ itemId: itemId })
    .then((products) => {
      console.log(products);
      res.send({ success: true, result: products });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Unable to fetch products by specific id",
      });
    });
};

exports.updateItemById = () => {
  console.log("In edit item by id");
};

exports.getItemById = async (req, res) => {
  const itemId = req.params.itemId;
  console.log(
    "In get item by id -------   + -------------------------" + itemId
  );
  await items
    .find({ _id: itemId })
    .then((product) => {
      console.log(product);
      res.send({ result: product });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Unable to fetch products by specific id",
      });
    });
};
