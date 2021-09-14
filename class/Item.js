const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemid : {
        type: String,
        required: true,
        unique: true 
    },

    itemname : {
        type: String,
        required: true,
        maxlength: 200
    },

    price : {
        type: Number,
        required: true,
    },

    Description : {
        type: String,
        required: true,
        maxlength: 1000,
       
    }
})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;



 
