const express = require("express");

const product = express.Router();

const userController = require("../controller/userController")

product.get("/productlimit9/", userController.getAllUser);
product.post("/login/", userController.login);
// product.get("/product", productController.getAllProduct);
// product.get("/productlimit4", productController.getProductLimit4);
// product.get("/productFiter/:Color", productController.filterAll);
product.post("/user", userController.createUser);
// product.get("/productID/:productId", productController.getProductById);
// product.put("/product/:productId", productController.updateProduct);
// product.delete("/product/:productId", productController.deleteProductById);

module.exports = product;
