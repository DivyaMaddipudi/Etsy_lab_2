const mongoose = require("mongoose");
const Userdb = require("./model");
const Items = require("./items");

var schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Userdb,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Items,
  },
});

const Purchases = mongoose.model("Purchases", schema);

module.exports = Purchases;
