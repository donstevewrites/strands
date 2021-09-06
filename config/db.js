const mongoose = require('mongoose');
const config = require('config');
const dbURL = config.get('mongoURI');


const connectDB = (cb) => {
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology : true,
        useCreateIndex : true
    })
    .then(() => {
        console.log('mongodb connect');
        cb;
    })
    .catch(err => {
        console.log(err);
        process.exit(1)
    })
}


module.exports = connectDB;