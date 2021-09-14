const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    supplierid : {
        type: String,
        required: true,
        unique: true 
    },

    suppliername : {
        type: String,
        required: true,
        maxlength: 200
    },

    address : {
        type: String,
        required: true,
        maxlength: 200
    },

    contactnumber : {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10
    },

    itemid : {
        type: String,
        required: true
    },

    siteid : {
        type: String,
        required: true
    }
})

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;