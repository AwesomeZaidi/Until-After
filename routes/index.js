const express = require('express');
const router = express.Router();

router.get('/journal', function(req, res, next) {
  res.render('journal');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;