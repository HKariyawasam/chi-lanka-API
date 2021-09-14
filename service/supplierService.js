const router = require("express").Router();
let Supplier = require("../class/Supplier");
const { v4: uuidv4 } = require("uuid");

router.route("/addSupplier").post((req,res) => {
    const supplierid = uuidv4();
    const suppliername = req.body.suppliername;
    const address = req.body.address;
    const contactnumber = req.body.contactnumber;
    const itemid = req.body.itemid;
    const siteid = req.body.siteid;

    const newSupplier = new Supplier({
        supplierid,
        suppliername,
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
