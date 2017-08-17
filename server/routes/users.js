var express = require('express');
var router = express.Router();
var userCont = require('../controllers/userController');
var authCont = require('../controllers/authController')


router.get('/', userCont.getAllUsers)

// users can create post
router.post('/', userCont.createNewUser)

// only its user can update its content
router.put('/:id', authCont.authUser, userCont.updateOne)

// only its user can remove its content
router.delete('/:id', authCont.authUser, userCont.removeOne)

module.exports = router;
