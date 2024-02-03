const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ]
});

module.exports = mongoose.model('order', OrderSchema);