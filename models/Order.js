const mongoose = require('mongoose');
const moment = require('moment');
let now = moment()

const orderSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderDate: {
        type: String,
        default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
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