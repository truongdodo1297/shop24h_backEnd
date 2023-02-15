const express = require("express");

const customer = express.Router();

const customerController = require("../controller/customerController")

customer.get("/customer", customerController.getAllCustomer);
customer.get("/customerLimit9", customerController.getAllCustomerLimit9);
customer.post("/post-customer", customerController.CreateCustomer);
customer.get("/customer/:customerId", customerController.getCustomerById);
customer.get("/customerFilter/:condition", customerController.filterCustomer);
customer.get("/customerSDT/:SDT", customerController.getCustomerBySDT);
customer.post("/customer/:customerId", customerController.updateCustomer);
customer.delete("/customer/:customerId", customerController.deleteCustomerById);

module.exports = customer;