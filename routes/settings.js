var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Journal = require("../models/journal");
const jwt = require('jsonwebtoken');


/* GET settings page. */
router.get('/settings', (req, res)=> {
    const invitecode = req.user.invitecode;
    // const friendsIds = req.user.friendsWithPermission;
    // console.log("friendsIds:", friendsIds);
    // const friends = [];
    if (req.user) {
        User.findById(req.user.id).populate('friendsWithPermission').then((friends) => {
            if (invitecode) {
                User.findById(invitecode).then((friend) => {
                    const name = friend.firstName + " " + friend.firstName;
                    const id = friend._id;
                    res.render('settings', { name, id, friends });
                })
            } else {
                res.render('settings', { friends });
            }
            // res.render('settings', { friends });            
        }).catch(console.err);
    } else {
        res.redirect('/login');
    };
        // req.user.populate('friendsWithPermission').then((friends) => {
        //     res.render('settings', { friends });            
        // })
        // for (var i = 0; i < friendsIds.length; i++) {
        //     User.findById(friendsIds[i]).then((user) => {

        //     }).catch(console.err);
        // }
        // Uer.findById(friendsIds).populate('user')
        // .then(project => {

        // User.find({
        //     _id: { $in: friendsIds }
        //   },{
        //         _id: -1, // use -1 to skip a field
        //     name: 1
        //   }).toArray(function (err, docs) {
        //     // docs array here contains all queried docs
        //     if (err) throw err;
        //     console.log(docs);
        //   });
        // async function printFiles () {
        //     const files = await getFilePaths();
          
        //     for (const file of files) {
        //       const contents = await fs.readFile(file, 'utf8');
        //       console.log(contents);
        //     }
        //   }
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