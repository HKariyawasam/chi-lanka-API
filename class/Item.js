const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemid: {
        type: String,
        required: true,
        unique: true
    },

    itemname: {
        type: String,
        required: true,
        maxlength: 200
    },

    price: {
        type: Number,
        required: true,
    },

    Description: {
        type: String,
        required: true,
        maxlength: 1000,

    },

    availability: {
        type: String,
        required: true,
        enum: ['InStock', 'Out-of Stock', 'Requested'],

    },

    Quantity: {
        type: Number,
        required: true,


    },
    ReceivedDate: {
        type: String,
        required: true,
    }
})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;




