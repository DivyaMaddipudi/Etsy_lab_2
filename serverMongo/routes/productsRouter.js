const express = require("express");
const productRoute = express.Router();
const product = require("../controller/Products");

//API
productRoute.post("/api/products/addProduct/:id", product.addProduct);
productRoute.post("/api/products/getAllProducts/:id", product.getAllProducts);
productRoute.get(
  "/api/products/getAllProducts/:id",
  product.getAllProductsById
);

productRoute.get(
  "/api/products/getItemsByItemSearchId/:id",
  product.getItemsByItemSearchId
);
productRoute.get("/api/products/updateItemById/:id", product.updateItemById);
productRoute.get("/api/products/getItemById/:itemId", product.getItemById);
productRoute.put("/api/products/editItemById/:itemId", product.editItemById);
productRoute.get("/api/products/getItems", product.getItems);

//Favourites
productRoute.post("/api/products/addFavourite/", product.addFavourite);
productRoute.get("/api/products/getFavourites/:id", product.getFavourites);
productRoute.delete(
  "/api/products/deleteFavourite/:favId",
  product.deleteFavourite
);

//Cart
productRoute.post("/api/products/addToCart/", product.addToCart);
productRoute.get("/api/products/getCartItems/:id", product.getCartItems);
productRoute.delete(
  "/api/products/deleteCartItem/:cartId",
  product.deleteCartItem
);
productRoute.delete("/api/products/clearCart", product.clearCart);

//purchases
productRoute.post(
  "/api/products/addProductToPurchase/",
  product.addProductToPurchase
);
productRoute.get(
  "/api/products/getPurchasedItems/:id",
  product.getPurchasedItems
);

module.exports = productRoute;
