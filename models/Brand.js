const mongoose = require('mongoose');


const BrandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    }
  
});

module.exports.Brand = mongoose.model('Brand', BrandSchema);