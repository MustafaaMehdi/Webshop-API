const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [1, 'Your password must be longer than 1 characters']
    }
})

module.exports = mongoose.model('user', UserSchema)