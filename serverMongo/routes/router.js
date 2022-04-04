const express = require("express");
const route = express.Router();
const user = require("../controller/User");

//API
route.post("/api/users/register", user.create);
route.post("/api/users/signin", user.findUser);
route.get("/api/users/signin", user.findUser);
route.post("/api/users/findShopDuplicates", user.findShopDuplicates);
route.put("/api/users/createShop/:id", user.createShop);
route.get("/api/users/getShopById/:id", user.getShopById);
route.put("/api/users/updateShopImageById/:id", user.updateShopImageById);
route.put("/api/users/updateUser/:id", user.updateUser);

module.exports = route;
