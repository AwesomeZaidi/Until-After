const express = require('express');
const router = express.Router();
const Journal = require("../models/journal");
const User = require("../models/user");

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
  const user = req.user;
  if (user) { //check if there's a user
    if (user.id == req.params.id) { // check if it's the right user
      user.accountOpenRequested = false;
      user.underInvestigation = false;
      user.save().then(() => {
        res.redirect('/');
      }).catch(console.err);
      // DON'T KNOW HOW TO DO THIS SO MAYBE WE CAN DO IT LATER ACTUALLY!
      // go through each of the users friendsWithPermissionsId's
      // set accountRequested = false
      // find out who sent in this request?
    } else {
      return res.status(401).send({ message: "You do not have access to this user!" });      
    }
  }
  else {
    res.redirect('/login');
  }
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