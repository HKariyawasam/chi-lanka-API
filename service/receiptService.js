const router = require("express").Router();
let Receipt = require("../class/Receipt");
const { v4: uuidv4 } = require("uuid");

router.route("/addReceipt").post((req, res) => {
    const receiptid = uuidv4();
    const orderno = req.body.orderno;
    const receiptdate = req.body.receiptdate;
    const tax = Number(req.body.tax);
    const totammount = Number(req.body.totammount);
    const shipto = req.body.shipto;

    const newReceipt = new Receipt({
        receiptid: receiptid.toString().slice(0, 8),
        orderno,
        receiptdate,
        tax,
        totammount,
        shipto
    })

    newReceipt.save().then(() => {
        res.status(200).send({ message: "Receipt is created" })
    }).catch((err) => {
        res.status(300).send({ status: "Error with creating of a receipt", error: err.message });
    })
})

router.route("/viewAReceipt/:receiptId").get((req, res) => {

    let receipt = req.params.receiptId;

    Receipt.find({ to: { $regex: "^" + receipt + ".*", $options: 'i' } }).then((receipt) => {
        res.json(receipt)

    }).catch((err) => {
        //console.log(err);
    })

})


router.route("/displayReceipts").get((req, res) => {

    Receipt.find().then((receipt) => {
        res.json(receipt)

    }).catch((err) => {
        //console.log(err);
    })
})

module.exports = router;
