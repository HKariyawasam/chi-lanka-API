const router = require("express").Router();
const moment = require('moment');
let Draft = require("../class/Draft");

router.route("/addDraft").post((req, res) => {
    const draftid = req.body.draftid;
    const draftdate = moment(req.body.orderdate).format('YYYY-MMMM-DD');
    const modifydate = moment(req.body.modifydate).format('YYYY-MMMM-DD');
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
    const amount01 = Number(req.body.amount01);
    const amount02 = Number(req.body.amount02);
    const amount03 = Number(req.body.amount03);

    const newDraft = new Draft({
        draftid,
        draftdate,
        modifydate,
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

    newDraft.save().then(() => {
        res.status(200).send({ message: "Draft Record is Added" })
    }).catch((err) => {
        res.status(300).send({ status: "Error in Draft Record Insertion", error: err.message });
    })
})


router.route("/displayDraft").get((req, res) => {

    Draft.find().then((draft) => {
        res.json(draft)

    }).catch((err) => {
        console.log(err);
    })
})



router.route("/getDraftByID/:dID").get(async (req, res) => {

    let dID = req.params.dID;

    const draft = await Draft.findOne({ draftid: dID })
        .then((draft) => {
            if (draft == null) {
                res.status(200).send({ status: "No Draft Record Retrieved" })
            }
            else {
                res.status(200).send({ status: "Draft Retrieved", draft: draft })
            }
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Server error", error: err.message });
        })

})


router.route("/deleteDraft").post(async (req, res) => {

    let dID = req.body.draft;
    await Draft.findOneAndDelete({ draftid: dID })
        .then(() => {
            res.status(200).send({ status: "Draft Record deleted" });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ status: "Error with deleting draft record", error: err.message });
        })
})


router.route("/updateDraft/:dID").put(async (req, res) => {

    let dID = req.params.dID;


    const { draftid, draftdate, modifydate, suppliername, title, shipto, status, total, comment, item01, item02, item03, itemName01, itemName02,
        itemName03, qty01, qty02, qty03, amount01, amount02, amount03 } = req.body;

    const updateDraft = {
        draftid, draftdate, modifydate, suppliername, title, shipto, status, total, comment, item01, item02, item03, itemName01, itemName02,
        itemName03, qty01, qty02, qty03, amount01, amount02, amount03
    }

    const update = await Draft.findOneAndUpdate({ draftid: dID }, updateDraft)
        .then(() => {
            res.status(200).send({ status: "Draft Record updated" })

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating draft record", error: err.message });
        })

})


module.exports = router;