const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Journal = require("../models/journal");
const jwt = require('jsonwebtoken');
const validator = require('validator');

/* GET signup page. */
router.get('/signup', (req, res) => {
    if (req.user) {
        res.redirect('/dashboard');
    } else {
        res.render('signup');
    }
})

/* GET login page. */
router.get('/login', (req,res) => {
    // Checks if there's a a user and if that user's an admin.
    console.log("in login route");
    
    const currentUser = req.user;
    if (currentUser) {
        res.redirect('/dashboard');
    } else {
    console.log("no user found, rendering login");

        res.render('login');
    }
})

// POST SIGNUP
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const invitecode = req.body.invitecode;

    if (invitecode.length >= 1) {
        User.findById(invitecode).then((foundUser) => {   
            User.findOne({username}, "username").then(user => {
                if(user) {
                    return res.status(401).send({ message: "Account with this username already exists" });
                } else {
                        const user = new User(req.body);
                        const journal = new Journal();                          
                        journal.save();
                        console.log("journal time created:", journal.createdAt);
                        user.journals.unshift(journal);
                        foundUser.friendsWithPermission.push(user);
                        foundUser.save();
                        //TODO: SendGrid.sendWelcomeEmail(user);
                        user.save().then((user) => {    // save the user and sign the jwt token in cookies.
                            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
                            
                            res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });    // set the cookie when someone signs up and logs in
                            res.redirect("/");
                        }).catch(err => {
                            console.log(err.message);
                            return res.status(400).send({ err: err });
                        });
                    }
                }).catch(console.err)
    }).catch((err) => {
        return res.status(401).send({ message: "Found no user with that invite code!" });
    })
    } else {
        User.findOne({username}, "username").then(user => {
            if(user) {
                return res.status(401).send({ message: "Account with this username already exists" });
            } else {
                    const user = new User(req.body);
                    const journal = new Journal();  
                    journal.save();
                    // console.log("journal time created:", journal.createdAt);
                    user.journals.unshift(journal);
                    //   SendGrid.sendWelcomeEmail(user);
                    // save the user and sign the jwt token in cookies.
                    user.save().then((user) => {
                        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
                        // set the cookie when someone signs up and logs in
                        res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
                        res.redirect("/");
                    }).catch(err => {
                        console.log(err.message);
                        return res.status(400).send({ err: err });
                    });
                }
            }).catch(console.err)
    }
});

// POST LOGIN
router.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("username:", username);
    console.log("password:", password);
    User.findOne({username}, "username password").then(user => {
        console.log("user:", user);
        if(!user) {
            // User not found
            return res.status(401).send({ message: "Wrong Username" });
        }
        // check password
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                // Password does not match
                return res.status(401).send({ message: "Wrong Username or password" });
            }
            // Create a token
            const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, {
                expiresIn: "60 days"
            });
            // Set a cookie and redirect to root
            res.cookie("nToken", token, {maxAge: 900000, httpOnly:true});
            User.findById(user._id).then(user => {
                res.redirect('/');
            })
            
        });
    })
    .catch(console.err);
})

// LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

module.exports = router;
