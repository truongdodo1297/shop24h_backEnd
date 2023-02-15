const express = require("express");
const order = express.Router();

const orderController = require("../controller/orderController")

order.get("/order", orderController.getAllOrder); 
order.get("/orderLimit9", orderController.getAllOrderLimit9); 
order.post("/post-order", orderController.CreateOrder);
order.get("/order/:orderId", orderController.getOrderById);
order.get("/orderFilter/:orderId", orderController.filterOrder);
order.put("/order/:orderId", orderController.updateOrder);
order.put("/deleteOrder/:orderId", orderController.deleteOrderById);

module.exports = order;