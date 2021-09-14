const router = require("express").Router();

const { Staff, SiteManager, ProcumentStaff, ManagementStaff } = require("../class/Staff");


//To retrieve List of site Manager staff
router.route("/getSiteManagersList").get((req, res) => {

    SiteManager.find().then((siteManager) => {
        res.json(siteManager)

    }).catch((err) => {
        console.log(err);
    })
})




module.exports = router;