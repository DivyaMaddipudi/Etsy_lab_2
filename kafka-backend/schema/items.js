const mongoose = require("mongoose");
const Userdb = require("./user");

var schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Userdb,
  },
  itemName: {
    type: String,
    default: null,
  },
  itemCategory: {
    type: String,
    default: null,
  },
  itemPrice: {
    type: Number,
    default: null,
  },
  itemDescription: {
    type: String,
    default: null,
  },
  itemCount: {
    type: Number,
    default: null,
  },
  itemImage: {
    type: String,
    default: null,
  },
  sales: {
    type: Number,
    default: 0,
  },
});

const Items = mongoose.model("Items", schema);

module.exports = Items;
