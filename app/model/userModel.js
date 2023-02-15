const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    passWord : {
        type: String,
        require: true
    },
    isAdmin : {
        type: String,
        default: false
    },
    email : {
        type: String
    },
    phone : {
        type : String
    }
})
module.exports = mongoose.model("user", userSchema)