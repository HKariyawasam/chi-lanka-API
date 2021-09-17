const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const draftSchema = new Schema({

    draftid: {
        type: String,
        required: true,
        unique: true
    },

    draftdate: {
        type: String,
        required: true,

    },

    modifydate: {
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
        enum: ['Waiting for Approval', 'Approved', 'Referred', 'Declined'],
    },

    total: {
        type: Number,
        required: true,
        minLength: 2
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
        required: true
    },

    qty02: {
        type: Number,
    },

    qty03: {
        type: Number,
    },

    amount01: {
        type: Number,
        required: true
    },
    amount02: {
        type: Number,
    },
    amount03: {
        type: Number,
    }

})

const Draft = mongoose.model("Draft", draftSchema);
module.exports = Draft;


