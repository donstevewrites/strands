const mongoose = require('mongoose');


const BundleSchema = new mongoose.Schema({
    bundleName: {
        type: String,
        required: true
    }
  
});

module.exports.Bundle = mongoose.model('Bundle', BundleSchema);