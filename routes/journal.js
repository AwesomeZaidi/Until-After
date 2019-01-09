const express = require('express');
const router = express.Router();
const Journal = require("../models/journal");

router.get('/', function(req, res, next) {
  console.log("loading journal...");
  
  const currentUser = req.user;
  console.log("currentUser:", currentUser);
  if (currentUser) {
    console.log("rendering journal...");
    
    res.render('journal');
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