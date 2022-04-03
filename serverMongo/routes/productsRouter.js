const express = require("express");
const productRoute = express.Router();
const product = require("../controller/Products");

//API
productRoute.post("/api/products/addProduct/:id", product.addProduct);
productRoute.post("/api/products/getAllProducts/:id", product.getAllProducts);
productRoute.get(
  "/api/products/getItemsByItemSearchId/:id",
  product.getItemsByItemSearchId
);
productRoute.get("/api/products/updateItemById/:id", product.updateItemById);
productRoute.get("/api/products/getItemById/:itemId", product.getItemById);

// route.post("/api/users/signin", user.findUser);
// route.get("/api/users/signin", user.findUser);
// route.post("/api/users/findShopDuplicates", user.findShopDuplicates);
// route.post("/api/users/createShop/:id", user.createShop);
// route.get("/api/users/getShopById/:id", user.getShopById);
// route.put("/api/users/updateShopImageById/:id", user.updateShopImageById);

module.exports = productRoute;
