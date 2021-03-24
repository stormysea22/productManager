const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is Required"]
    },
    price: {
        type: Number,
        required: [true, "Price is Required"]
    },
    description: {
        type: String,
        required: [true, "Description is Required"]
    },
}, { timestamps: true })

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
    