const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const uploadImage = require("../controller/User");
var items = require("../models/items");
const json = require("formidable/src/plugins/json");
const favouritesDb = require("../models/favourites");
const cartDb = require("../models/cart");
const purchasesDb = require("../models/purchases");

// const productRouter = express.Router();

//connect to s3 bucket

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

exports.addProduct = (req, res) => {
  // console.log(
  //   "In add products ------------------------------------------------"
  // );
  const userId = req.params.id;
  // console.log(req)

  console.log(userId);
  // console.log(itemName);
  // console.log(itemDescription);
  // console.log(itemPrice);
  // console.log(itemCount);
  // console.log(itemCategory);

  const uploadSingle = upload("etsyappstoragedivya").single("itemImage");

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
  const term = req.body.searchTerm;

  console.log(userId);

  if (term) {
    console.log("filtering in shop");
    await items
      .find({ userId: userId, itemName: { $regex: term, $options: "i" } })
      .then((products) => {
        console.log(products);
        res.send({ success: true, result: products });
      });
  } else {
    console.log("getting all in shop");

    await items
      .find({ userId: userId })
      .then((products) => {
        // console.log(products);
        res.send({ success: true, result: products });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: "Unable to fetch products by specific id",
        });
      });
  }
};

exports.getAllProductsById = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId + "get items by user id");
  await items
    .find({ userId: userId })
    .then((products) => {
      // console.log(products);
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
      // console.log(products);
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
      // console.log(product);
      res.send({ result: product });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Unable to fetch products by specific id",
      });
    });
};

exports.editItemById = (req, res) => {
  console.log("In edit item");
  const itemId = req.params.itemId;
  const itemName = req.body.itemName;
  const itemDescription = req.body.itemDescription;
  const itemPrice = req.body.itemPrice;
  const itemCount = req.body.itemCount;
  items
    .findByIdAndUpdate(itemId, {
      itemName,
      itemDescription,
      itemPrice,
      itemCount,
    })
    .then((data) => {
      if (!data) {
        console.log(data + " can't update item details");
      } else {
        console.log(data);
        console.log("item details updated successfully");
        res.send({ success: true, data });
      }
    });
};

exports.getItems = (req, res) => {
  items
    .find()
    .limit(20)
    .sort({ $natural: 1 })
    .then((result) => {
      console.log("In get items page");
      // console.log(result);
      res.send({ success: true, result });
    });
};

//favourites
exports.addFavourite = (req, res) => {
  console.log("handling add fav ");
  const userId = req.body.userId;
  console.log(userId);
  const itemId = req.body.itemId;

  const favourites = new favouritesDb({
    userId,
    itemId,
  });

  favourites
    .save(favourites)
    .then((data) => {
      console.log(data);
      res.send({ success: true, result: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "some error occured" });
    });
};

exports.getFavourites = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  console.log("Get favourites");

  favouritesDb
    .find({ userId })
    .populate("itemId")
    .then((favItems) => {
      console.log(favItems);
      res.send({ success: true, result: favItems });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteFavourite = (req, res) => {
  const favId = req.params.favId;
  console.log(favId);
  favouritesDb
    .findByIdAndDelete({ _id: favId })
    .then((result) => {
      console.log("Item deleted successfully");
      res.send({ success: true, result });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.addToCart = async (req, res) => {
  console.log("handling add cart ");
  const userId = req.body.userId;
  console.log(userId);
  const itemId = req.body.itemId;
  console.log(itemId);
  const qty = req.body.qty;

  const cart = new cartDb({
    userId: userId,
    itemId: itemId,
    qty: qty,
  });

  const isCartItemExist = await cartDb.exists({ itemId: itemId });

  if (isCartItemExist) {
    console.log("item already exist");
    cartDb
      .findOneAndUpdate({ itemId: itemId }, { qty: qty })
      .then((data) => {
        // console.log(data);
        res.send({ success: true, result: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "some error occured" });
      });
  } else {
    console.log("item not exist");
    cart
      .save(cart)
      .then((data) => {
        // console.log(data);
        res.send({ success: true, result: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "some error occured" });
      });
  }
};

exports.getCartItems = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  console.log("Get cart items");

  cartDb
    .find({ userId })
    .populate("itemId")
    .then((cartItems) => {
      console.log(cartItems);
      res.send({
        success: true,
        result: cartItems,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteCartItem = (req, res) => {
  const cartId = req.params.cartId;
  console.log(cartId + "===========================================");
  cartDb
    .findByIdAndDelete({ _id: cartId })
    .then((result) => {
      console.log("Item deleted successfully");
      res.send({ success: true, result });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.clearCart = (req, res) => {
  cartDb
    .deleteMany({})
    .then((result) => {
      res.send({ message: "Cart Items cleared", result });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.addProductToPurchase = (req, res) => {
  console.log("handling add purchases ");

  const purchase = req.body.product;

  console.log(purchase.itemId);
  const purchases = new purchasesDb({
    userId: purchase.userId,
    itemName: purchase.itemName,
    itemPrice: purchase.itemPrice,
    itemCount: purchase.itemCount,
    qty: purchase.qty,
    itemId: purchase.itemId,
    itemImage: purchase.itemImage,
    itemDescription: purchase.itemDescription,
    giftMessage: purchase.giftMessage,
  });

  purchases
    .save(purchases)
    .then((data) => {
      console.log(data);
      res.send({ success: true, result: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "some error occured" });
    });
};

exports.getPurchasedItems = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  console.log("In get purchased items");

  purchasesDb
    .find({ userId })
    .populate("itemId")
    .then((purchasedItems) => {
      console.log(purchasedItems);
      res.send({ success: true, result: purchasedItems });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.editItemQtyById = (req, res) => {
  console.log("In edit item for qty");

  const itemId = req.params.itemId;
  const sales = req.body.itemSales;
  const itemCount = req.body.itemCount;
  items
    .findByIdAndUpdate(itemId, {
      itemCount,
      sales,
    })
    .then((data) => {
      if (!data) {
        console.log(data + " can't update item details");
      } else {
        console.log(data);
        console.log("item details updated successfully");
        res.send({ success: true, data });
      }
    });
};

exports.getSalesCount = (req, res) => {
  console.log(
    "in sales count backend " + "++++++++++++++++++++++++++++++++++++++++++"
  );
  items
    .aggregate([
      {
        $group: {
          _id: "$itemId",
          sum: {
            $sum: "$sales",
          },
        },
      },
    ])
    .then((result) => {
      console.log(
        "in sales count backend " + "++++++++++++++++++++++++++++++++++++++++++"
      );
      console.log(result);
      res.send({ success: true, result: result });
    })
    .catch((err) => {
      console.log(
        "in not sales count backend " +
          "++++++++++++++++++++++++++++++++++++++++++"
      );
      res.send(err);
    });

  // .then((data) => {
  //   console.log(data);
  //   res.send({ success: true, result: data });
  // })
  // .catch((err) => {
  //   res.send(err);
  // });
  // write code to find sales count
};

exports.getSearchItems = (req, res) => {
  const searchValue = req.params.searchValue;
  console.log(searchValue);
  console.log("In get items search value");

  items
    .find({ itemName: { $regex: searchValue, $options: "i" } })
    .then((result) => {
      console.log(result);
      res.send({ success: true, result });
    })
    .catch((err) => {
      res.send(err);
    });
};
