var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Journal = require("../models/journal");
const AccessRequest = require("../models/accessRequest");
const twilio = require("./twilio.js");

router.get('/:id/requestAccess', (req, res) => {
    User.findById(req.user.invitecode).then((user) => {
        name = user.firstName + " " + user.lastName;
        id = user.id;
        res.render('requestAccess', { name, id });
    })
})

/* POST request to access user journal. */
router.post('/:id/requestAccess', function(req, res) {
    const id = req.params.id;
    User.findById(id).then((user) => {
        const accessRequest = new AccessRequest(req.body);
        user.accountOpenRequested = true;
        user.underInvestigation = true;
        // const userNumber = String(user.number);
        // const name = `${user.firstName} ${user.lastName}`;
        // const requesterName = `${req.user.firstName} ${req.user.lastName}`;
        // console.log("requesterName:", requesterName);
        
        // console.log("userNumber:", userNumber);
        twilio.sendText();
        user.save();
        // now we have to trigger some functions from another API to alert the user.
        accessRequest.save().then(() => {
            res.redirect(`/${id}/journal`);
        }).catch(console.err)
    }).catch((err) => {
        return res.status(401).send({ message: "Found no user that unique ID!" });
    });
});


module.exports = router;