const router = require("express").Router();
const { Staff, SiteManager, ProcumentStaff, ManagementStaff } = require("../class/Staff");

//To retrieve List of Management staff
router.route("/getProcuementStaffList").get((req, res) => {

    ProcumentStaff.find().then((procuement) => {
        res.json(procuement)

    }).catch((err) => {
        console.log(err);
    })
})




module.exports = router;