const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderid: {
        type: String,
        required: true,
        unique: true
    },

    orderdate: {
        type: String,
        required: true,

    },

    suppliername: {
        type: String,
        required: true,
        maxlength: 200
    },

    title: {
        type: String,
        required: true
    },

    shipto: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['Approved', 'Pending', 'Declined'],
    },

    total: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    },


})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;


