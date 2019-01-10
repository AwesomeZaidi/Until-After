const express = require('express');
const router = express.Router();
const Journal = require("../models/journal");

router.get('/', function(req, res, next) {
  const currentUser = req.user;
  if (currentUser) {
    Journal.findById(currentUser.journal).then((journal) => {
      res.render('journal', {journal} );
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

router.put('/saveJournalEntry', function(req, res, next) {
    currentUser = req.user;

    console.log("currentUser journalId:", currentUser.journal[0]);
    
    Journal.findById(currentUser.journal[0]).then((journal) => {
      console.log("found journal:");
      journal.day = req.body.entry;
      journal.save().then(() => {
        res.sendStatus(200);
      })
      // journal.day.set(req.body).save();
      console.log("journal updated:", journal);
      
    }).catch((err) => {
      console.log(err);
    })
});

module.exports = router;