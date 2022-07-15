const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    movieName: {
        type: String 
    },
    movieImg:{
        type: String
    },
    returnDate: {
        type: Date,
        default: +new Date() + 7*24*60*60*1000 
    },
    haveOrder: {
        type: Boolean,
        default: false
    }
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;