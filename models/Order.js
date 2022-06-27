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
        type: String //Para que se vea en compass, sgro hay otra manera d hacrlo
    },
    returnDate: {
        type: Date,
        default: +new Date() + 7*24*60*60*1000 // Para que la fecha de retorno sea 7 dias despues
    },
    haveOrder: {
        type: Boolean,
        default: false
    }

})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;