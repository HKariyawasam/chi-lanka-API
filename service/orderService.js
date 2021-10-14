const router = require("express").Router();
const moment = require('moment');
let Order = require("../class/Order");

router.route("/addOrder").post((req, res) => {
    const orderid = req.body.orderid;
    const orderdate = moment(req.body.orderdate).format('YYYY-MMMM-DD');
    const suppliername = req.body.suppliername;
    const title = req.body.title;
    const shipto = req.body.shipto;
    const status = req.body.status;
    const total = Number(req.body.total);
    const comment = req.body.comment;
    // const item01 = req.body.item01;
    // const item02 = req.body.item02;
    // const item03 = req.body.item03;
    // const qty01 = Number(req.body.qty01);
    // const qty02 = Number(req.body.qty02);
    // const qty03 = Number(req.body.qty03);

    const newOrder = new Order({
        orderid,
        orderdate,
        suppliername,
        title,
        shipto,
        status,
        total,
        comment,
        // item01,
        // item02,
        // item03,
        // qty01,
        // qty02,
        // qty03
    })

    newOrder.save().then(() => {
        res.status(200).send({ message: "Orderl Record is Added" })
    }).catch((err) => {
        res.status(300).send({ status: "Error in Order Record Insertion", error: err.message });
    })
})

router.route("/displayOrders").get((req, res) => {

    Order.find().then((order) => {
        res.json(order)

    }).catch((err) => {
        //console.log(err);
    })
})

router.route("/getOrderByID/:rID").get(async (req, res) => {

    let rID = req.params.rID;//rental id taken from front end

    const order = await Order.findOne({ id: rID })
        .then((order) => {
            if (order == null) {
                res.status(200).send({ status: "No Order Record Retrieved" })
            }
            else {
                res.status(200).send({ status: "Order Record Retrieved", order: order })
            }
        }).catch(() => {
            //console.log(err.message);
            res.status(500).send({ status: "Server error", error: err.message });
        })
})

//this route is used to find the last added order details
router.route("/lastAddedOrder").get(async (req, res) => {

    const order = await Order.find().sort({ _id: -1 }).limit(1)
        .then((order) => {
            res.json(order)
        }).catch(() => {
            //console.log(err.message);
            res.status(500).send({ status: "Error with get Order", error: err.message });
        })

})


router.route("/deleteOrder/:orderID").delete(async (req, res) => {

    let oID = req.params.orderID;
    await Order.findOneAndDelete({ orderid: oID })
        .then(() => {
            res.status(200).send({ status: "Order Record deleted" });
        }).catch(() => {
            //console.log(err);
            res.status(500).send({ status: "Error with deleting order record", error: err.message });
        })
})


router.route("/updateOrder/:orderid").put(async (req, res) => {

    let oID = req.params.orderid;

    //const { orderid, orderdate, suppliername, title, shipto, status, total, comment, item01, item02, item03, qty01, qty02, qty03 } = req.body;
    const { orderid, orderdate, suppliername, title, shipto, status, total, comment } = req.body;
    //const updateOrder = { orderid, orderdate, suppliername, title, shipto, status, total, comment, item01, item02, item03, qty01, qty02, qty03 }
    const updateOrder = { orderid, orderdate, suppliername, title, shipto, status, total, comment }


    const update = await Order.findOneAndUpdate({ orderid: oID }, updateOrder)
        .then(() => {
            res.status(200).send({ status: "Order Record updated" })
        }).catch((err) => {
            //console.log(err);
            res.status(500).send({ status: "Server error Error with updating data", error: err.message });
        })

})


module.exports = router;