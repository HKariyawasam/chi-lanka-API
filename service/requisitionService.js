const router = require("express").Router();
const moment = require('moment');
const {v4: uuidv4} = require("uuid");
let Requisition = require("../class/Requisition");

router.route("/addRequisition").post((req, res) => {
    const requisitionid = uuidv4();
    const requisiondate = moment(req.body.requisiondate).format('YYYY-MMMM-DD');
    const suppliername = req.body.suppliername;
    const title = req.body.title;
    const shipto = req.body.shipto;
    const status = req.body.status;
    const total = req.body.total;
    const comment = req.body.comment;
    const item01 = req.body.item01;
    const item02 = req.body.item02;
    const item03 = req.body.item03;

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
        item03
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

    const requisition = await Requisition.findOne({ id: rID })
        .then((requisition) => {
            if (requisition == null) {
                res.status(200).send({ status: "No Requisition Record Retrieved" })
            }
            else {
                res.status(200).send({ status: "Rental Requisition Retrieved", requisition: requisition })
            }
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({ status: "Server error", error: err.message });
        })

})


router.route("/deleteRequisition/:rID").post(async (req, res) => {

    let rID = req.params.rID;
    await Requisition.findOneAndDelete({ requisitionid: rID })
        .then(() => {
            res.status(200).send({ status: "Requisition Record deleted" });
        }).catch(() => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting requisition record", error: err.message });
        })
})


router.route("/updateRequisition/:rID").put(async (req, res) => {
    console.log(req.body);
    let rID = req.params.rID;


    const {  
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
        item03 } = req.body;

    const updateRequisition = {
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
        item03
    }

    const update = await Requisition.findOneAndUpdate({ requisitionid: rID }, updateRequisition)
        .then(() => {
            res.status(200).send({ status: "Requisition Record updated" })
            console.log(err);
            res.status(500).send({ status: "Server error Error with updating data", error: err.message });
        })

})


module.exports = router;