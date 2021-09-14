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

    item01: {
        type: String,
        required: true
    },

    item02: {
        type: String,
        required: true
    },

    item03: {
        type: String,
        required: true
    },

    qty01 : {
        type:Number,
        required : true
    },

    qty02 : {
        type:Number,
        required : true
    },

    qty03 : {
        type:Number,
        required : true
    },


})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;


