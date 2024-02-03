const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    lager: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('product', ProductSchema)