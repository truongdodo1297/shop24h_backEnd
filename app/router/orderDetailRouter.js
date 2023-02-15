const express = require("express");

const orderDetail = express.Router();

const orderDetailController = require("../controller/orderDetailController")

orderDetail.get("/orderDetail", orderDetailController.getAllOrderDetail);
orderDetail.post("/post-orderDetail", orderDetailController.CreateOrderDetail);
orderDetail.get("/orderDetail/:orderDetailId", orderDetailController.getOrderDetailById);
orderDetail.post("/orderDetail/:orderDetailId", orderDetailController.updateOrderDetail);
orderDetail.delete("/orderDetail/:orderDetailId", orderDetailController.deleteOrderDetailById);

module.exports = orderDetail;