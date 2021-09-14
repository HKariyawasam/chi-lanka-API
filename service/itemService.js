const router = require("express").Router();
let Item = require("../class/Item");

router.route("/addItem").post((req, res) => {
    const itemid = req.body.itemid;
    const itemname = req.body.itemname;
    const price = req.body.price;
    const Description = req.body.Description;

    const newItem = new Item({
        itemid,
        itemname,
        price,
        Description
    })

    newItem.save().then(() => {
        res.status(200).send({ message: "Item is added" })
    }).catch((err) => {
        res.status(300).send({ status: "Error with item Insersion", error: err.message });
    })
})

//To delete a specific item
router.route("/removeItem/:itemID").delete(async (req, res) => {

    let item = req.params.itemID;//item id taken from frontend

    await Item.findOneAndDelete({ itemid: item })
        .then(() => {
            res.status(200).send({ status: "Item deleted" });
        }).catch(() => {
            console.log(err);
            res.status(500).send({ status: "Error with delete of an item", error: err.message });
        })

})


//To display all the items available in system
router.route("/displayAvailableItems").get((req, res) => {

    Item.find().then((item) => {
        res.json(item)

    }).catch((err) => {
        console.log(err);
    })
})


//To update a specific item available in system
router.route("/updateItem/:itemID").put(async (req, res) => {

    let item = req.params.itemID;//items Id taken from the frontend

    const { itemid, itemname, price, Description } = req.body;

    const updateItem = {//create a object containing the data that needs to be updated
        itemid, itemname, price, Description
    }

    const update = await Item.findOneAndUpdate({ itemid: item }, updateItem)
        .then(() => {
            res.status(200).send({ status: "Item Details updated" })//sending details of the updated data back to front end
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data of an Item", error: err.message });
        })

})

router.route("/searchAnItem/:itemName").get((req, res) => {

    let val = req.params.itemName;

    Item.find({ to: { $regex: "^" + val + ".*", $options: 'i' } }).then((items) => {
        res.json(items)

    }).catch((err) => {
        console.log(err);
    })

})

router.route("/getItemByID/:iID").get(async (req, res) => {

    let iID = req.params.iID;//rental id taken from front end

    const order = await Item.findOne({ itemid: iID })
        .then((item) => {
            if (item == null) {
                res.status(200).send({ status: "No Order Record Retrieved" })
            }
            else {
                res.status(200).send({ status: "Order Record Retrieved", item: item })
            }
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({ status: "Server error", error: err.message });
        })
})


module.exports = router;
