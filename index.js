const express = require("express");
const shop = express();

const port = 8000;

const mongoose = require("mongoose");

//import Router
const productRouetr = require("./app/router/ProductRouter");
const customerRouter = require("./app/router/customerRouter");
const orderRouter = require("./app/router/orderRouter");
const orderDetailRouter = require("./app/router/orderDetailRouter");
const userRouter = require("./app/router/userRouter");

mongoose.connect("mongodb://127.0.0.1:27017/Shop24h", function (error) {
    if (error) throw error;
    console.log("Kết nối thành công MongoDB")
})
// Khai báo để sử dụng body json
shop.use(express.json());
shop.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

    // Khai báo để sử dụng UTF-8
    shop.use(express.urlencoded({
        extended: true
    }))
    // khai bao Router
    shop.use("/", customerRouter);
    shop.use("/", productRouetr);
    shop.use("/", orderRouter);
    shop.use("/", orderDetailRouter);
    shop.use("/", userRouter);



shop.get("/", (req, res) => {
    res.json({
        message: "connrect!"
    })
})

shop.listen(port, () => {
    console.log("Chạy thành công trên:", port)
})