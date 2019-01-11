var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Journal = require("../models/journal");
const jwt = require('jsonwebtoken');


/* GET settings page. */
router.get('/settings', function(req, res, next) {
    const invitecode = req.user.invitecode;
    const friendsIds = req.user.friendsWithPermission;
    if (req.user) { // check to see if we have a user.
        const friends = User.find(friendsIds); // find returns a cursor. An array of any objects it finds.
        console.log("FRIENDS;", friends);
        
        if (invitecode) { // check if our user has an accesscode to someones account
            User.findById(invitecode).then((friend) => { // if so, find who's it is.
                const name = friend.firstName + " " + friend.firstName;
                const id = friend._id;
                // next() //read more into what this does exactly, where we go next?           
                res.render('settings', { name, id, friends });
            })
        } else {
            res.render('settings', { friends });
        }
    } else {
        res.redirect('/login');
    };
});

router.put('/settings', function(req, res, next) {
    if (req.user) {
        User.findById(req.user.id).then((user) => {
            user.set(req.body).save();
            res.redirect('/settings');
        }).catch((err) => {
            console.log(err)
        })
    } else {
        res.redirect('/login');
    };
});


module.exports = router;