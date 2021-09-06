const mongoose = require('mongoose');


const ColorSchema = new mongoose.Schema({
    colorName: {
        type: String,
        required: true
    }
  
});

module.exports.Color = mongoose.model('Color', ColorSchema);