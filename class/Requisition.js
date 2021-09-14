const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requisitionSchema = new Schema({
    requisitionid : {
        type: String,
        required: true,
        unique: true 
    },

    Date : {
        type: String,
        required: true,
    
    },

    suppliername : {
        type: String,
        required: true,
        maxlength: 200
    },

    title : {
        type: String,
        required: true
    },

    shipto : {
        type: String,
        required : true
    },

    status : {
        type: String,
        required : true
    },

    total : {
        type: Number,
        required : true
    },

    comment : {
        type: String,
        required : true
    },

    item01 : {
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
    }
})

const Requisition = mongoose.class("Requisition", requisitionSchema);
module.exports = Requisition;


