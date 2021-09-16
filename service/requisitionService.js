const router = require("express").Router();
const moment = require('moment');
const { v4: uuidv4 } = require("uuid");
let Requisition = require("../class/Requisition");

router.route("/addRequisition").post((req, res) => {
    const requisitionid = req.body.orderid;
    const requisiondate = moment(req.body.orderdate).format('YYYY-MMMM-DD');
    const suppliername = req.body.suppliername;
    const title = req.body.title;
    const shipto = req.body.shipto;
    const status = req.body.status;
    const total = Number(req.body.total);
    const comment = req.body.comment;
    const item01 = req.body.item01;
    const item02 = req.body.item02;
    const item03 = req.body.item03;
    const itemName01 = req.body.itemName01;
    const itemName02 = req.body.itemName02;
    const itemName03 = req.body.itemName03;
    const qty01 = Number(req.body.qty01);
    const qty02 = Number(req.body.qty02);
    const qty03 = Number(req.body.qty03);
    const amount01 = Number(req.body.qty01);
    const amount02 = Number(req.body.qty02);
    const amount03 = Number(req.body.qty03);

    const newRequisition = new Requisition({
        requisitionid,
        requisiondate,
        suppliername,
        title,
        shipto,
        status,
        total,
        comment,
        item01,
        item02,
        item03,
        itemName01,
        itemName02,
        itemName03,
        qty01,
        qty02,
        qty03,
        amount01,
        amount02,
        amount03
    })

    newRequisition.save().then(() => {
        res.status(200).send({ message: "Requisition Record is Added" })
    }).catch((err) => {
        res.status(300).send({ status: "Error in Requisition Record Insertion", error: err.message });
    })
})


router.route("/displayRequisition").get((req, res) => {

    Requisition.find().then((requisition) => {
        res.json(requisition)

    }).catch((err) => {
        console.log(err);
    })
})



router.route("/getRequisitionByID/:rID").get(async (req, res) => {

    let rID = req.params.rID;

    const requisition = await Requisition.findOne({ requisitionid: rID })
        .then((requisition) => {
            if (requisition == null) {
                res.status(200).send({ status: "No Requisition Record Retrieved" })
            }
            else {
                res.status(200).send({ status: "Rental Requisition Retrieved", requisition: requisition })
            }
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Server error", error: err.message });
        })

})


router.route("/deleteRequisition").post(async (req, res) => {

    let rID = req.body.data.id;
    await Requisition.findOneAndDelete({ requisitionid: rID })
        .then(() => {
            res.status(200).send({ status: "Requisition Record deleted" });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ status: "Error with deleting requisition record", error: err.message });
        })
})


router.route("/updateRequisition/:rID").put(async (req, res) => {

    let rID = req.params.rID;


    const { requisitionid, requisitionname, requisiondate, suppliername, title, shipto, status, total, comment, item01, item02, item03, itemName01, itemName02,
        itemName03, qty01, qty02, qty03, amount01, amount02, amount03 } = req.body;

    const updateRequisition = {
        requisitionid, requisitionname, requisiondate, suppliername, title, shipto, status, total, comment, item01, item02, item03, itemName01, itemName02,
        itemName03, qty01, qty02, qty03, amount01, amount02, amount03
    }

    const update = await Requisition.findOneAndUpdate({ requisitionid: rID }, updateRequisition)
        .then(() => {
            res.status(200).send({ status: "Requisition Record updated" })

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating requisition record", error: err.message });
        })

})


module.exports = router;