const router = require("express").Router();
let Item = require("../class/Item");

router.route("/addItem").post((req,res) => {
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
        res.status(200).send({message: "Item is added"})
    }).catch((err) => {
        res.status(300).send({ status: "Error with item Insersion", erroe: err.message});
    })
})

module.exports = router;
