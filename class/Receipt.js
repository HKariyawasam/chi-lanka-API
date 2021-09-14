const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const receiptSchema = new Schema({
    receiptid : {
        type: String,
        required: true,
        unique: true 
    },

    orderno : {
        type: String,
        required: true,
        
    },

    receiptdate : {
        type: String,
        required: true,
    },

    tax : {
        type: Number,
        required: true,
       
    },

    totammount : {
        type: Number,
        required: true,
       
    }
})

const Receipt = mongoose.model("Receipt", receiptSchema);
module.exports = Receipt;



 
