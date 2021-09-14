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

//Staff Management Routes
const Staff = require("./service/staffService.js");
app.use("/staff", Staff);

const SiteManager = require("./service/siteManagerService.js");
app.use("/sitemanager", SiteManager);

const ProcumentStaff = require("./service/procuementStaffService.js");
app.use("/procumentstaff", ProcumentStaff);

const ManagementStaff = require("./service/managementStaffService.js");
app.use("/managementstaff", ManagementStaff);


