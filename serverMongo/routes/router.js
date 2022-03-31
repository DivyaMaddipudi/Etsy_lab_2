const express = require("express");
const route = express.Router();
const user = require("../controller/User");

//API
route.post("/api/users/register", user.create);
route.post("/api/users/signin", user.findUser);
route.get("/api/users/signin", user.findUser);
route.post("/api/users/findShopDuplicates", user.findShopDuplicates);
route.post("/api/users/createShop/:id", user.createShop);

module.exports = route;
