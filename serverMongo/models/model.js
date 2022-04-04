const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  username: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  fullAddress: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: 000 - 000 - 0000,
  },
  dob: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  profilePic: {
    type: String,
    default: null,
  },
  about: {
    type: String,
    default: null,
  },
  shopName: {
    type: String,
    default: null,
    unique: true,
  },
  shopImage: {
    type: String,
    default: null,
  },
});

const Userdb = mongoose.model("Userdb", schema);

module.exports = Userdb;
