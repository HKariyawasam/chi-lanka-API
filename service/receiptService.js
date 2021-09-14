const router = require("express").Router();
let Receipt = require("../class/Receipt");
const { v4: uuidv4 } = require("uuid");

router.route("/addReceipt").post((req,res) => {
    const receiptid = uuidv4();
    const orderno = req.body.orderno;
    const address = req.body.address;
    const contactnumber = req.body.contactnumber;
    const itemid = req.body.itemid;
    const siteid = req.body.siteid;

    const newSupplier = new Supplier({
        receiptid,
        orderno,
        address,
        contactnumber,
        itemid,
        siteid
    })

    newSupplier.save().then(() => {
        res.status(200).send({message: "Supplier is added"})
    }).catch((err) => {
        res.status(300).send({ status: "Error with supplier Insersion", erroe: err.message});
    })
})

module.exports = router;
