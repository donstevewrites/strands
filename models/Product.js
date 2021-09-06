const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    brand: {
        type: String,
    },
    color: {
        type: String,
    },
    image: {
        type: String,
    },
    hairType: {
        type: String,
    },
    bundle: {
        type: String,
    }
  
});

module.exports.Product = mongoose.model('Product', ProductSchema);