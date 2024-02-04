const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    token: {
        type: String,
        select: false
    }
})

module.exports = mongoose.model('category', CategorySchema)