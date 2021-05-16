const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        maxlength: 32,
        required: true 
    },
    location: {
        type: String,
        required: true,
        maxlength: 56, 
    },
    telegram_no: {
        type: String,    
    },
    _isNew: {
        type: String,
    },
    _store: {
        type: String,
    },
    instagram_handle: {
        type: String,
    },
    
    email_address: {
        type: String,
        rrquired: true
    },
    quantity:{
        type: Number,

    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }

    

}, {timestamps: true});




module.exports = mongoose.model("Product", productSchema);