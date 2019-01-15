const express = require('express');
const router = express.Router();
const Journal = require("../models/journal");
const User = require("../models/user");
const Entry = require("../models/entry");


/* GET user journal page. - NOT FULLY IMPLEMENTED YET I BELIEVE.... */
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

// GET INDEX ROUTE
router.get('/', (req, res) => {
  const currentUser = req.user;
  if (currentUser) {
    Journal.findById(currentUser.journals[0]).then((journal) => {
      const accountOpenRequested = currentUser.accountOpenRequested;
      if (journal.entries < 1) {
        console.log("in if");
        const entryObj = new Entry();
        journal.entries.push(entryObj);
        entryObj.save();
        journal.save();
        const entry = entryObj.text;
        const entryIndex = 0;
        res.render('journal', {journal, entry, entryIndex, accountOpenRequested});
      } else {
        console.log("in else");
        Entry.findById(journal.entries[0]).then((entry) => {
          const entryIndex = 0;
          res.render('journal', {journal, entry, entryIndex, accountOpenRequested});
        }).catch(console.err);      
      }
    }).catch((err) => {
      console.log(err);
    })
  } else {
    console.log("no user found, redirecting to login...");
    res.redirect('/login');
  }
});

router.get('/journal/:journalIndex/:entryIndex', (req, res) => {
  console.log("getting specific journal entry page");
  const journalIndex = req.params.journalIndex;
  console.log("journalIndex", journalIndex);
  const entryIndex = req.params.entryIndex;
  console.log("entryIndex", entryIndex);
  const currentUser = req.user;
  if (currentUser) {
    // console.log("got current user", currentUser);
    const journals = currentUser.journals;
    // console.log("journals:", journals);
    
    Journal.findById(journals[journalIndex]).then((journal) => {
      const accountOpenRequested = currentUser.accountOpenRequested;
        Entry.findById(journal.entries[entryIndex]).then((entry) => {
          res.render('journal', {journal, entry, entryIndex, accountOpenRequested} );
        }).catch(console.err);
    }).catch(console.err);
  } else {
    console.log("no user found, redirecting to login...");
    res.redirect('/login');
  }
});

router.get('/dashboard', (req, res) => {
  currentUser = req.user;
  // find User
  // find all the users journal(s) and load all their entry objects.
  if (currentUser) {
    // for all the users journal objects, show all the strings in the entries array one by one.
    const journalsIds = currentUser.journals;
    // again, a quick fix... but this actually might turn into a really bright refactor later!
    // Every User should honestly probably only have 1 Journal!
    const journalId = currentUser.journals[0];
    // console.log("journalId;", journalId);
    
    console.log("journalsIds:", journalsIds);
    Journal.find({
      '_id': {
        $in: journalsIds
      }
    }, function(err, journals) {
      console.log("journals:", journals);
      // temp fix for product demo day as there will only be 1 Journal obj for now.
      const entryIds = journals[0].entries;
      // const journalId = journals[0]._id;
      console.log("entryIds:", entryIds);
      Entry.find({
        '_id': {
          $in: entryIds
        }
      }, function(err, entries) {
        console.log("journalId:", journalId);
        
        console.log("entries:", entries);
        entries = entries.reverse();
        res.render('dashboard', { entries, journalId });
      })
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
    console.log(" in saveJournalEntry route ");    
    //TODO FIX: BIG BUG IDK WHY THIS IS UNDEFINED.
    const currentUser = req.user;
    if (currentUser) {
      console.log("currentUser:", currentUser);
      const journalId = req.body.journalId;
      console.log("journalId:", journalId);
      const entryIndex = req.body.entryIndex;
      console.log("entryIndex:", entryIndex);
      
      Journal.findOne({_id: journalId}).then(journal => {
        if(journal.entries.length < 1) {
          // if there's no entries then we need to create one.
          console.log("in if");
          const entry = new Entry(req.body.entry);
          entry.save();
          journal.entries.push(entry);
        } else {
          console.log("in else");
          // journal.entries[entryIndex].update(entry);
          Entry.findById(journal.entries[entryIndex]).then((entry) => {
            entry.text = req.body.entry;
            journal.entries[entryIndex] = entry;
            entry.save();
            journal.save();
            res.sendStatus(200);
          }).catch(console.err);
        }
      }).catch(console.err);
      // Journal.findById(journalId).then((journal) => {
      // // console.log("journal:", journal);
      // journal.entries[Number(entryIndex)] = req.body.entry;
      // journal.save();
      // res.sendStatus(200);
      // if (journal.entries.length < 1) {
      //   console.log("journal.entries.length < 1");
      //   journal.entries[entryIndex] = entry;
      //   journal.save().then((journal) => {
      //     console.log("new journal entries updated:", journal);
      //     res.sendStatus(200);
      //   }).catch(console.err);
      // } else {
      //   console.log("in the else!");
        
      //   journal.entries[entryIndex] = entry;    
      //   journal.save().then((journal) => {
      //     console.log("new journal entries updated:", journal);
      //     res.sendStatus(200);
      //   }).catch(console.err);
      // }
    // }).catch(console.err);
    } else {
      console.log("no user");
      res.redirect('/login');
    }
});

router.post('/newEntryInJournal', (req, res) => {
  console.log("clicked newEntryInJournal");
  const currentUser = req.user;
  const journalId = req.body.journalId;
  // const journalId = req.body.journalId;
  // console.log("journalId:", journalId);
  
  // get the user
  if (currentUser) {
    console.log("got currentUser");
    console.log("journalId:", journalId);
    Journal.findById(journalId).then((journal) => {
      const entry = new Entry();
      entry.save();
      journal.entries.unshift(entry);
      journal.save();
      res.redirect('/');
    }).catch(console.err);
    
      // go to their latest journal
      // Journal.findById(journalId).then((journal) => {
      // const journal = new Journal();
      // append a new empty string to the users specific journal entriews
      // Journal.findById(currentUser.journals[0]).then((journal) => {
        // console.log("journal:", journal);
        
        // journal.entries.unshift("");
        // journal.save();
      // }).catch(console.err);
      // console.log("new empty journal:", journal);
      // append a new entry to their list of entries
      // journal.entries.unshift(entry);
      // console.log("new journal:", journal);
      // console.log("newer journal:", journal);
      // journal.entry = "";
      // currentUser.journals.unshift(journal);
      // currentUser.save();
      // the new journal will always be 0 and starting at the 0th index in the entries array.
      // res.redirect("/");
      // }).catch(console.err)
    // create a new entry
  } else {
    res.redirect('/login');
  }
});

module.exports = router;