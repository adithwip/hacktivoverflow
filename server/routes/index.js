var express = require('express');
var router = express.Router();
var authCont = require('../controllers/authController');

router.post('/signup', authCont.signup)

router.post('/login', authCont.login)

router.post('/getdata', authCont.userData)

module.exports = router;
