var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Journal = require("../models/journal");
const jwt = require('jsonwebtoken');


/* GET settings page. */
router.get('/settings', (req, res)=> {
    const invitecode = req.user.invitecode;
    const friendsIds = req.user.friendsWithPermission;
    const friends = [];
    if (req.user) {
        async function printFiles () {
            const files = await getFilePaths();
          
            for (const file of files) {
              const contents = await fs.readFile(file, 'utf8');
              console.log(contents);
            }
          }
        if (invitecode) {
            User.findById(invitecode).then((friend) => {
                const name = friend.firstName + " " + friend.firstName;
                const id = friend._id;
                res.render('settings', { name, id });
            })
        } else {
            res.render('settings');
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