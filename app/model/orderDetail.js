const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderDetailModel = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity:{
        type: Number,
        require: true
    },
    imgUrl:{
        type: String
    },
    buyPrice: {
        type: Number
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model("orderDetail", orderDetailModel)