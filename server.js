const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = 4000;

const URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());



mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindandModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

app.listen(port, () => {
    console.log(`Server Is Running on Port: ${port}`);
});

const supplierRouter = require("./service/supplierService.js");
app.use("/supplier", supplierRouter);

const orderRouter = require("./service/orderService.js");
app.use("/order", orderRouter);

const itemRouter = require("./service/itemService.js");
app.use("/item", itemRouter);

// const receiptRouter = require("./service/receiptService.js");
// app.use("/receipt", receiptRouter);

// const requisitionRouter = require("./service/requisitionService.js");
// app.use("/requisition", requisitionRouter);


