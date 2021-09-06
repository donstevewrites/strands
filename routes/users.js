var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('auth/register', { title: 'Express' });
});

module.exports = router;
