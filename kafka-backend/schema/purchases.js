const mongoose = require("mongoose");
const Userdb = require("./user");
const Items = require("./items");

var schema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      default: null,
    },
    userId: {
      type: String,
      default: null,
    },
    itemName: {
      type: String,
      default: null,
    },
    itemImage: {
      type: String,
      default: null,
    },
    itemCount: {
      type: Number,
      default: null,
    },
    itemPrice: {
      type: Number,
      default: null,
    },
    qty: {
      type: Number,
      default: null,
    },
    itemDescription: {
      type: String,
      default: null,
    },
    giftMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Purchases = mongoose.model("Purchases", schema);

module.exports = Purchases;
