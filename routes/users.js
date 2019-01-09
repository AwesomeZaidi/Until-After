var express = require('express');
var router = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken');

/* GET signup page. */
router.get('/signup', function(req, res, next) {
    if (req.user) {
        res.redirect('/dashboard');
    } else {
        res.render('signup');
    }
})

/* GET login page. */
router.get('/login', (req,res) => {
    // Checks if there's a a user and if that user's an admin.
    const currentUser = req.user;
    if (currentUser) {
        User.findById(currentUser._id).then(user => {
            if (user.isAdmin == true) {
                    res.redirect("admin-dashboard");
            } else {
                res.redirect('dashboard');
            }
        })
    } else {
            res.render('login');
    }
})

// POST SIGNUP
router.post('/signup', (req, res) => {
    console.log("req.body:", req.body);
      
    const username = req.body.username;
    User.findOne({username}, "username").then(user => { 
    if(user) {
        return res.status(401).send({ message: "Account with this username already exists" });
    } else {
            const user = new User(req.body);          
            //   SendGrid.sendWelcomeEmail(user);
            // save the user and sign the jwt token in cookies.
            user.save().then((user) => {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
                // set the cookie when someone signs up and logs in
                res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
                res.redirect("/dashboard");
            }).catch(err => {
                console.log(err.message);
                return res.status(400).send({ err: err });
            });
        }
  }).catch((err) => {
      console.log("Error Message:", err);
  });
});


router.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({username}, "username password").then(user => {
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
                res.redirect('/dashboard');
            })
            
        });
    })
    .catch(err => {
        console.log(err);
    });
})

module.exports = router;
