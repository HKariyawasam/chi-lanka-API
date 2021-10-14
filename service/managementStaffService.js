const router = require("express").Router();
const { Staff, SiteManager, ProcumentStaff, ManagementStaff } = require("../class/Staff");

//To retrieve List of Management staff
router.route("/getManagementList").get((req, res) => {

    ManagementStaff.find().then((managementStaff) => {
        res.json(managementStaff)

    }).catch((err) => {
        //console.log(err);
    })
})




module.exports = router;