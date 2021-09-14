const router = require("express").Router();
const moment = require('moment');
const {v4: uuidv4} = require("uuid");
let Requisition = require("../class/Order");

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
        res.status(200).send({ message: "Orderl Record is Added" })
    }).catch((err) => {
        res.status(300).send({ status: "Error in Order Record Insertion", error: err.message });
    })
})

module.exports = router;