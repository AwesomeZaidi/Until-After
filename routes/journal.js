const express = require('express');
const router = express.Router();
const Journal = require("../models/journal");
const User = require("../models/user");

/* GET user journal page. */
router.get('/:id/journal', (req, res) => {
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

router.get('/', (req, res) => {
  console.log("getting index");
  const currentUser = req.user;
  if (currentUser) {
    console.log("got current user", currentUser);
    const journals = currentUser.journals;
    Journal.findById(journals[journals.length-1]).then((journal) => {
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

router.get('/dashboard', (req, res) => {
  currentUser = req.user;

  if (currentUser) {
    // console.log("curr user:", currentUser);
    
    // for all the users journal objects, show all the strings in the entries array one by one.
    const journalsIds = currentUser.journals;
    // console.log("journalsIds:", journalsIds);
    
    Journal.find({
      '_id': {
        $in: journalsIds
      }
    }, function(err, journals) {
      console.log("journals:", journals);
      
      res.render('dashboard', { journals });
    });
  } else { 
    res.redirect('/login');
  }
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
      // might need a request object
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

router.put('/saveJournalEntry', (req, res) => {
  console.log(" in route ");
  
    const currentUser = req.user;
    const journals = currentUser.journals;
    // change this line later to save to the most recent journal model
    console.log("current user journals:", journals);
    
    Journal.findById(journals[0]).then((journal) => {
      console.log("journal:", journal);
      
      console.log("req.body.entry:", req.body.entry);
      
      journal.entry = req.body.entry;
      journal.save().then(() => {
        res.sendStatus(200);
      })
    }).catch(console.err);
});

router.post('/newEntryInJournal', (req, res) => {
  console.log("clicked newEntryInJournal");
  const currentUser = req.user;
  // get the user
  if (currentUser) {
      const journals = currentUser.journals;
      // go to their latest journal
      Journal.findById(journals[0]).then((journal) => {
        const entry = journal.entry;
        console.log("journal:", journal);
        // append a new entry to their list of entries
        journal.entries.unshift(entry);
        console.log("new journal:", journal);
        console.log("newer journal:", journal);
        journal.entry = "";
        journal.save();
        res.redirect('/');
      }).catch(console.err)
    // create a new entry
  } else {
    res.redirect('/login');
  }
});

module.exports = router;