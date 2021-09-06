const mongoose = require('mongoose');


const HairTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: true
    }
  
});

module.exports.HairType = mongoose.model('HairType', HairTypeSchema);