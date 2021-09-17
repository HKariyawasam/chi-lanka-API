const router = require("express").Router();
let Login = require("../class/Login");


// router.route("/addLogin").post((req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     const newLogin = new Login({
//         username,
//         password
//     })

//     newLogin.save().then(() => {
//         res.status(200).send({ message: "User Added" })
//     }).catch((err) => {
//         res.status(300).send({ status: "Error in login", error: err.message });
//     })
// })


//check the availabilty of user in the data base
router.route("/get/:un/:pass").get(async (req, res) => {

    let UN = req.params.un;//username taken from the frontend login form
    let pass = req.params.pass;//password taken from the frontend login form

    const user = await Login.findOne({ username: UN, password: pass })
        .then((user) => {
            res.status(200).send({ status: "User fetched", login: user })
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });
        })

})

module.exports = router;