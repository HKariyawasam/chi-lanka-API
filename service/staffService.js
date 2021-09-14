const router = require("express").Router();
const moment = require('moment');
const { v4: uuidv4 } = require("uuid");
const { Staff, SiteManager, ProcumentStaff, ManagementStaff } = require("../class/Staff");

router.route("/addStaff").post((req, res) => {

    const id = uuidv4();
    const name = req.body.name;
    const address = req.body.address;
    const designation = req.body.designation;
    const contactNumber = Number(req.body.contactNumber);
    const salary = Number(req.body.salary);
    const joinedDate = moment(req.body.joinedDate).format('YYYY-MM-DD');
    const work_site_id = req.body.work_site_id;
    const hours = Number(req.body.hours);
    const bonus = Number(req.body.bonus);

    //constructor of the base class schema
    const newStaff = new Staff({
        id, name, address, designation, contactNumber, salary, joinedDate
    })


    if (designation == 'SiteManager') {
        const newSiteManagers = new SiteManager({
            id, name, address, designation, contactNumber, salary, joinedDate, work_site_id
        })

        newSiteManagers.save().then(() => {//pass the object to database if successful

            res.status(200).send({ message: "WorkSite Manager Record is Added" })
        }).catch((err) => {//error or exception handling
            //console.log(err);
            res.status(300).send({ status: "Error in WorkSite Manager Record Insertion", error: err.message });
        })

    } else if (designation == 'Procuement_Staff') {

        const newProcumentStaff = new ProcumentStaff({
            id, name, address, designation, contactNumber, salary, joinedDate, hours
        })

        newProcumentStaff.save().then(() => {//pass the object to database if successful

            res.status(200).send({ message: "Procuement_Staff Record is Added" })
        }).catch((err) => {//error or exception handling
            //console.log(err);
            res.status(300).send({ status: "Error in Procuement_Staff Record Insertion", error: err.message });
        })

    } else if (designation == 'Management') {

        const newManagement = new ManagementStaff({
            id, name, address, designation, contactNumber, salary, joinedDate, bonus
        })

        newManagement.save().then(() => {//pass the object to database if successful

            res.status(200).send({ message: "Management Staff Record is Added" })
        }).catch((err) => {//error or exception handling
            res.status(300).send({ status: "Error in Management Staff Record Insertion", error: err.message });
        })

    } else if (designation == 'Intern') {
        const newStaff = new Staff({
            id, name, address, designation, contactNumber, salary, joinedDate, bonus
        })

        newStaff.save().then(() => {//pass the object to database if successful

            res.status(200).send({ message: "Staff Record is Added" })
        }).catch((err) => {//error or exception handling
            //console.log(err);
            res.status(300).send({ status: "Error in Staff Record Insertion", error: err.message });
        })

    }

})

//To remove a staffDetails from database
router.route("/deleteStaff/:sid/:designation").delete(async (req, res) => {

    let sID = req.params.sid;//staffID taken from the fronend
    let sDes = req.params.designation;//designation

    if (sDes == 'SiteManager') {
        await SiteManager.findOneAndDelete({ id: sID })
            .then(() => {
                res.status(200).send({ status: "SiteManager Record deleted" });
            }).catch(() => {
                console.log(err);
                res.status(500).send({ status: "Error with deleting SiteManager record", error: err.message });
            })

    } else if (sDes == 'Procuement_Staff') {

        await ProcumentStaff.findOneAndDelete({ id: sID })
            .then(() => {
                res.status(200).send({ status: "Procuement_Staff Record deleted" });
            }).catch(() => {
                console.log(err);
                res.status(500).send({ status: "Error with deleting Procuement_Staff record", error: err.message });
            })

    } else if (sDes == 'Management') {

        await ManagementStaff.findOneAndDelete({ id: sID })
            .then(() => {
                res.status(200).send({ status: "Management Staff Record deleted" });
            }).catch(() => {
                console.log(err);
                res.status(500).send({ status: "Error with deleting Management staff record", error: err.message });
            })

    } else if (sDes == 'Intern') {
        await Staff.findOneAndDelete({ id: sID })
            .then(() => {
                res.status(200).send({ status: "Staff Record deleted" });
            }).catch(() => {
                console.log(err);
                res.status(500).send({ status: "Error with deleting staff record", error: err.message });
            })

    }



    //To update a staffDetails
    router.route("/updateStaffDetails/:sid/:designation").put(async (req, res) => {

        let sID = req.params.sid;//staffID taken from the fronend
        let sDes = req.params.designation;//designation

        const { id, name, address, designation, contactNumber, salary, joinedDate, work_site_id, hours, bonus } = req.body;//we call this as dStructure

        if (sDes == 'SiteManager') {

            const UpdateSiteManager = {
                id, name, address, designation, contactNumber, salary, joinedDate, work_site_id
            }

            const update = await SiteManager.findOneAndUpdate({ id: sID }, UpdateSiteManager)
                .then(() => {
                    res.status(200).send({ status: "SiteManager updated" })//sending details of the updated data back to front end
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({ status: "Error with updating data", error: err.message });
                })

        } else if (sDes == 'Procuement_Staff') {
            const UpdateProcuementStaff = {
                id, name, address, designation, contactNumber, salary, joinedDate, hours
            }

            const update = await ProcumentStaff.findOneAndUpdate({ id: sID }, UpdateProcuementStaff)
                .then(() => {
                    res.status(200).send({ status: "ProcumentStaff updated" })//sending details of the updated data back to front end
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({ status: "Error with updating data", error: err.message });
                })

        } else if (sDes == 'Management') {
            const UpdateManagement = {
                id, name, address, designation, contactNumber, salary, joinedDate, bonus
            }

            const update = await ManagementStaff.findOneAndUpdate({ id: sID }, UpdateManagement)
                .then(() => {
                    res.status(200).send({ status: "ManagementStaff updated" })//sending details of the updated data back to front end
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({ status: "Error with updating data", error: err.message });
                })

        } else if (sDes == 'Intern') {
            const UpdateStaff = {
                id, name, address, designation, contactNumber, salary, joinedDate
            }

            const update = await Staff.findOneAndUpdate({ id: sID }, UpdateStaff)
                .then(() => {
                    res.status(200).send({ status: "Staff updated" })//sending details of the updated data back to front end
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({ status: "Error with updating data", error: err.message });
                })

        }

    })













})



module.exports = router;