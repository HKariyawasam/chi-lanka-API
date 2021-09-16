const router = require("express").Router();
let Supplier = require("../class/Supplier");
const { v4: uuidv4 } = require("uuid");

router.route("/addSupplier").post((req, res) => {
    const supplierid = uuidv4();
    const suppliername = req.body.suppliername;
    const address = req.body.address;
    const contactnumber = Number(req.body.contactnumber);
    const itemid = req.body.itemid;
    const itemname = req.body.itemname;
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
        res.status(200).send({ message: "Supplier is added" })
    }).catch((err) => {
        res.status(300).send({ status: "Error with supplier Insersion", error: err.message });
    })
})



//To delete a specific supplier
router.route("/removeSupplier/:supID").delete(async (req, res) => {

    let supplier = req.params.supID;//supplier id taken from frontend

    await Supplier.findOneAndDelete({ supplierid: supplier })
        .then(() => {
            res.status(200).send({ status: "Supplier deleted" });
        }).catch(() => {
            console.log(err);
            res.status(500).send({ status: "Error with delete of a supplier", error: err.message });
        })


})


//To display all the supplier available in system
router.route("/displayAvailableSupplierList").get((req, res) => {

    Supplier.find().then((supplier) => {
        res.json(supplier)

    }).catch((err) => {
        console.log(err);
    })
})


//To update a specific supplier available in system
router.route("/updateSupplierDetails/:supID").put(async (req, res) => {

    let supID = req.params.supID;//supplier Id taken from the frontend

    const { supplierid, suppliername, address, contactnumber, itemid, siteid } = req.body;

    const updateSupplier = {//create a object containing the data that needs to be updated
        supplierid, suppliername, address, contactnumber, itemid, siteid
    }

    const update = await Supplier.findOneAndUpdate({ supplierid: supID }, updateSupplier)
        .then(() => {
            res.status(200).send({ status: "Supplier Details updated" })//sending details of the updated data back to front end
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data of supplier", error: err.message });
        })

})

router.route("/getSupplierByName/:sName").get(async (req, res) => {

    let sName = req.params.sName;//rental id taken from front end

    Supplier.find({ suppliername: { $regex: "^" + sName + ".*", $options: 'i' } }).then((supplier) => {
        res.json(supplier)

    }).catch(() => {
        console.log(err.message);
        res.status(500).send({ status: "Server error", error: err.message });
    })
})


router.route("/searchSupplierItems/:supplier").get((req, res) => {

    let val = req.params.supplier.trim();

    Supplier.find({ suppliername: { $regex: ".*" + val + ".*", $options: 'i' } }).then((supplier) => {
        var length = supplier.length;
        let values = "";
        for (var a = 0; a < supplier.length; a++) {
            values += supplier[a].itemid + ",";
        }
        values = Array.from(new Set(values.split(','))).toString();
        res.json(values);

    }).catch((err) => {
        console.log(err);
    })

})




module.exports = router;
