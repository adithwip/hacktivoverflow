var express = require('express');
var router = express.Router();
var authCont = require('../controllers/authController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', authCont.signup)

router.post('/login', authCont.login)

router.post('/getdata', authCont.userData)

module.exports = router;
