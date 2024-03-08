const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: String,
        default: [],
    },
    taste: {
        type: String,
        enum: ["sweet", "spicy","sour"],
        required: true,
    },
    num_sales: {
        type: Number,
       default: 0
    },
    is_drink:{
        type: Boolean,
        default: false
    }

},{timestamps:true, versionKey:false});

const MenuItem = mongoose.model("Menu",menuItemSchema);



module.exports =MenuItem