const express = require("express");

const product = express.Router();

const productController = require("../controller/ProductController")

product.get("/productlimit9/", productController.getAllProduct9);
product.get("/product", productController.getAllProduct);
product.get("/productlimit4", productController.getProductLimit4);
product.get("/productFiter/:Color", productController.filterAll);
product.post("/post-product", productController.CreateProduct);
product.get("/productID/:productId", productController.getProductById);
product.put("/product/:productId", productController.updateProduct);
product.delete("/product/:productId", productController.deleteProductById);

module.exports = product;
