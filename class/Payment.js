const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    paymentid: {
        type: String,
        required: true,
        unique: true
    },

    orderid: {
        type: String,
        required: true,
    },

    totalAmount: {
        type: Number,
        required: true,
        minlength: 4
    },

    paymentDesc: {
        type: String,
    },

    payDate: {
        type: String,
        required: true,
    }
})

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
