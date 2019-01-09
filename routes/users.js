var express = require('express');
var router = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

// POST SIGNUP
router.post('/signup', (req, res) => {
  console.log("in signup route");
  
  const username = req.body.username;
  console.log("username:", username);
  
  // const email = req.body.email;
  User.findOne({username}, "username").then(user => { 
      if(user) {
          return res.status(401).send({ message: "Account with this username already exists" });
      } else {
          const user = new User(req.body);
          console.log("user:", user);
          
          // SendGrid.sendWelcomeEmail(user);
          user.save().then((user) => {
              const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
              // set the cookie when someone signs up and logs in
              res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
              res.redirect("/");
          }).catch(err => {
              console.log(err.message);
              return res.status(400).send({ err: err });
          });
      } // end else
  }).catch((err) => {
      console.log("Error Message:", err);
  });
});

module.exports = router;
