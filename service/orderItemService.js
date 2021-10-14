const router = require("express").Router();
const moment = require('moment');
let OrderItem = require("../class/OrderItems");

router.route("/addOrderItems").post((req, res) => {
    const orderid = req.body.orderid;
    const item01 = req.body.item01;
    const item02 = req.body.item02;
    const item03 = req.body.item03;
    const itemName01 = req.body.itemName01;
    const itemName02 = req.body.itemName02;
    const itemName03 = req.body.itemName03;
    const qty01 = Number(req.body.qty01);
    const qty02 = Number(req.body.qty02);
    const qty03 = Number(req.body.qty03);
    const unitPrice01 = Number(req.body.amount1);
    const unitPrice02 = Number(req.body.amount2);
    const unitPrice03 = Number(req.body.amount3);

    const newOrderItems = new OrderItem({
        orderid,
        item01,
        item02,
        item03,
        itemName01,
        itemName02,
        itemName03,
        qty01,
        qty02,
        qty03,
        unitPrice01,
        unitPrice02,
        unitPrice03
    })

    newOrderItems.save().then(() => {
        res.status(200).send({ message: "Order Items are Added for the Order" })
    }).catch((err) => {
        res.status(300).send({ status: "Error in Order Items Insertion", error: err.message });
    })
})

router.route("/displayOrderItems/:orderId").get(async (req, res) => {

    let orderId = req.params.orderId;//rental id taken from front end

    const orderItem = OrderItem.findOne({ orderid: orderId })
        .then((orderItems) => {
            res.json(orderItems)
        }).catch(() => {
            //console.log(err.message);
            res.status(500).send({ status: "Server error", error: err.message });
        })
})

router.route("/deleteOrderItems/:orderID").delete(async (req, res) => {

    let oID = req.params.orderID;
    await OrderItem.findOneAndDelete({ orderid: oID })
        .then(() => {
            res.status(200).send({ status: "Order Record deleted" });
        }).catch(() => {
            //console.log(err);
            res.status(500).send({ status: "Error with deleting order record", error: err.message });
        })
})


router.route("/updateOrderItems/:orderid").put(async (req, res) => {

    let oID = req.params.orderid;

    const { orderid, item01, item02, item03, itemName01, itemName02, itemName03, qty01, qty02, qty03, unitPrice01, unitPrice02, unitPrice03 } = req.body;

    const updateOrderItems = { orderid, item01, item02, item03, itemName01, itemName02, itemName03, qty01, qty02, qty03, unitPrice01, unitPrice02, unitPrice03 }

    const update = await OrderItem.findOneAndUpdate({ orderid: oID }, updateOrderItems)
        .then(() => {
            res.status(200).send({ status: "Order Record updated" })
        }).catch((err) => {
            //console.log(err);
            res.status(500).send({ status: "Server error Error with updating data", error: err.message });
        })

})


module.exports = router;