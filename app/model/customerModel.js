const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const customerSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        default: "",
    },
    sex: {
        type:String
    },
    address: {
        city: {
            type: String,
            default: ""
        },
        distric: {
            type: String,
            default: ""
        },
        war: {
            type: String,
            default: ""
        },
        apartment: {
            type: String,
            default: ""
        }
    },
    orders: {
        type: mongoose.Types.ObjectId,
        ref: "order"
    }

})
module.exports = mongoose.model("customer", customerSchema)