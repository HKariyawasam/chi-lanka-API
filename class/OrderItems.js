const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({

    orderid: {
        type: String,
        required: true,
        unique: true
    },

    item01: {
        type: String,
        required: true
    },

    item02: {
        type: String,

    },

    item03: {
        type: String,

    },

    itemName01: {
        type: String,
        required: true
    },

    itemName02: {
        type: String,

    },

    itemName03: {
        type: String,

    },

    qty01: {
        type: Number,

    },

    qty02: {
        type: Number,

    },

    qty03: {
        type: Number,

    },

    unitPrice01: {
        type: Number,
        required: true
    },

    unitPrice02: {
        type: Number,

    },

    unitPrice03: {
        type: Number,

    },


})

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = OrderItem;


