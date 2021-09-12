const mongoose = require('mongoose');

const shortId = require('shortid');

shortId.generate();

const shortUrlSchema = new mongoose.Schema({
    long:{
        type:String,
        required:true
    },
    short: {
        type:String,
        required:true,
        default:shortId.generate()
    },
    count: {
        type:Number, 
        default:0
    },
      
}, {timestamps: true})

module.exports = mongoose.model('shortUrls', shortUrlSchema);