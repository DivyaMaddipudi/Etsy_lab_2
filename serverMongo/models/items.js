const mongoose = require("mongoose");
const Userdb = require("./model");

var schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Userdb,
  },
  itemName: {
    type: String,
  },
  itemCategory: {
    type: String,
  },
  itemPrice: {
    type: Number,
  },
  itemDescription: {
    type: String,
  },
  itemCount: {
    type: Number,
  },
  itemImage: {
    type: String,
  },
  sales: {
    type: Number,
    default: null,
  },
});

const Items = mongoose.model("Items", schema);

module.exports = Items;
