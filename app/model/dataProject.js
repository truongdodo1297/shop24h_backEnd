const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataProductSchema = new Schema({
    name:{
        type: String,
        unique: true,
        require: true,
    },
    description:{
        type: String,
        require: true
    },
    type:{
        type: String,
        require: true
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
module.exports = mongoose.model("dataProduct", dataProductSchema)