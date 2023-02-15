const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderModel = new Schema({
    orderCode: {
        type: Number
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    requirement : {
        type: String
    },
    order: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
            }
        }
    ],
    orderDate : {
        type: Date
    },
    status: {
        type: String
    }
})
module.exports = mongoose.model("order", orderModel);