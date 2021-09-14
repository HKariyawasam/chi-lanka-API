const router = require("express").Router();
let Receipt = require("../class/Receipt");
const { v4: uuidv4 } = require("uuid");

router.route("/addReceipt").post((req,res) => {
    const receiptid = uuidv4();
    const orderno = req.body.orderno;
    const receiptdate = req.body.receiptdate;
    const tax = req.body.tax;
    const totammount = req.body.totammount;

    const newReceipt = new Receipt({
        receiptid,
        orderno,
        receiptdate,
        tax,
        totammount
    })

    newReceipt.save().then(() => {
        res.status(200).send({message: "Supplier is added"})
    }).catch((err) => {
        res.status(300).send({ status: "Error with supplier Insersion", erroe: err.message});
    })
})

module.exports = router;