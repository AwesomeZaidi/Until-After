const express = require('express');
const router = express.Router();
const Journal = require("../models/journal");
const User = require("../models/user");
const twilio = require("./twilio.js");
console.dir(twilio);  

// console.dir(router);

/* GET user journal page. */
router.get('/:id/journal', function(req, res, next) {
  console.log("journal view");
  if (req.user == null) {
    res.redirect('/login');
  }
  else if (req.user.id == req.params.id) {
    res.redirect('/');
  } 
  else {
      User.findById(req.params.id).then((user) => {
          if (req.user.death == true) {
              res.render('public-journal-view', {user});
          }
          else if (user.underInvestigation == true) {
              const investigating = user.underInvestigation;
              res.render('journal-view', { investigating });
          }
          else if (user.accountOpenRequested == false) {
              res.render('journal-view');
          }
      }).catch((err) => {
          return res.status(401).send({ message: "Found no user that unique ID!" });
      })   
  }
})

router.get('/', function(req, res, next) {
  console.log("in route");
  twilio.sendText();

  const currentUser = req.user;
  if (currentUser) {
    Journal.findById(currentUser.journal).then((journal) => {
      const accountOpenRequested = currentUser.accountOpenRequested;
      res.render('journal', {journal, accountOpenRequested} );
    }).catch((err) => {
      console.log(err);
    })
  } else {
    console.log("no user found, redirecting to login...");

    res.redirect('/login');
  }
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.post('/imalive/:id', (req,res) => {

});

router.put('/saveJournalEntry', function(req, res, next) {
    currentUser = req.user;

    Journal.findById(currentUser.journal[0]).then((journal) => {
      journal.day = req.body.entry;
      journal.save().then(() => {
        res.sendStatus(200);
      })
    }).catch(console.err);
});

module.exports = router;