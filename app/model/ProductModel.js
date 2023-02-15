const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        unique: true,
        require: true,
    },
    description:{
        type: String
    },
    type:{
        type: String,
        require: false,
    },
    imageUrl:{
        type: String,
    },
    buyPrice:{
        type: Number,
        require: true
    },
    promotionPrice: {
        type: Number,
        require:true
    },
    color:{
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require:true
    }, 
    brand:{
        type: String,
        require: true
    }
})
module.exports = mongoose.model("Product", productSchema)