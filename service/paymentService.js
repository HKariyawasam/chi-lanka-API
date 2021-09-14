const router = require("express").Router();
const moment = require('moment');
let Payment = require("../class/Payment");

router.route("/createPayment").post((req, res) => {
    const paymentid = req.body.paymentid;
    const orderid = req.body.orderid;
    const totalAmount = req.body.totalAmount;
    const paymentDesc = req.body.paymentDesc;
    const payDate = moment().format('YYYY-MM-DD');

    const newPayment = new Payment({
        paymentid,
        orderid,
        totalAmount,
        paymentDesc,
        payDate
    })

    newPayment.save().then(() => {
        res.status(200).send({ message: "Payment is created" })
    }).catch((err) => {
        res.status(300).send({ status: "Error with payment creation", error: err.message });
    })
})

//To delete a specific item
router.route("/removePayment/:oID").delete(async (req, res) => {

    let pay = req.params.oID;//item id taken from frontend

    await Payment.findOneAndDelete({ orderid: pay })
        .then(() => {
            res.status(200).send({ status: "Payment deleted" });
        }).catch(() => {
            console.log(err);
            res.status(500).send({ status: "Error with delete of a payment", error: err.message });
        })

})



//To update a specific item available in system
router.route("/updatePayment/:oID").put(async (req, res) => {

    let pay = req.params.oID;//items Id taken from the frontend

    const { paymentid, orderid, totalAmount, paymentDesc, payDate } = req.body;

    const updatePayment = {//create a object containing the data that needs to be updated
        paymentid, orderid, totalAmount, paymentDesc, payDate
    }

    const update = await Payment.findOneAndUpdate({ orderid: pay }, updatePayment)
        .then(() => {
            res.status(200).send({ status: "Payment Details updated" })//sending details of the updated data back to front end
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data of an Payment", error: err.message });
        })

})

router.route("/searchAnPayment/:oID").get((req, res) => {

    let pay = req.params.oID;

    Payment.find({ to: { $regex: "^" + pay + ".*", $options: 'i' } }).then((payment) => {
        res.json(payment)

    }).catch((err) => {
        console.log(err);
    })

})


module.exports = router;
