const express = require('express');
const router = express.Router();
const threadCont = require('../controllers/threadController');
const responseCont = require('../controllers/responseController');
const authCont = require('../controllers/authController')

router.get('/', threadCont.getThread)

router.get('/:id/replies', threadCont.getOne)

router.get('/:id/reply', responseCont.get)

router.get('/:id/reply/:repid', responseCont.getOne)

// router.post('/', authCont.userInfo, threadCont.createThread)

// for creating dummy data
router.post('/', threadCont.createThread)

router.post('/:id/reply', authCont.userInfo, responseCont.create)

router.put('/:id', authCont.userInfo, threadCont.update)

router.put('/:id/reply/:repid', authCont.userInfo, responseCont.update)

router.delete('/:id', threadCont.remove)

router.delete('/:id/reply/:repid', responseCont.remove)

module.exports = router;
