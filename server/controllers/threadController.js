var Thread = require('../models/thread');

function createThread (req, res) {
  let newThread = new Thread({
    title: req.body.title,
    threadContent: req.body.threadContent,
    creator: req.body.creator,
    createdAt: new Date()
  })
  newThread.save((err, created_thread) => {
    if(err) {
      res.send(err)
    } else {
      res.send(created_thread)
    }
  })
}

function getThread (req, res) {
  Thread.find({})
  .populate('creator')
  .exec(function (err, threads) {
    res.send(err ? err : threads)
  })
}

function getOne (req, res) {
  Thread.findById(req.params.id)
  .populate('creator')
  .populate('replies')
  .exec(function (err, thread) {
    res.send(err ? err : thread)
  })
}

function update (req, res) {
  Thread.findById(req.params.id, (err, thread) => {
    if(thread.creator == req.body.creator) {
      thread.title = req.body.title || thread.title
      thread.threadContent = req.body.threadContent || thread.threadContent
      thread.updatedAt = new Date()
      thread.save((err, editedThread) => {
        if(err) {
          res.send(err)
        } else {
          res.send(editedThread)
        }
      })
    } else {
      res.send('Not authorized')
    }
  })
}

function remove (req, res) {
  Thread.findOneAndRemove({_id: req.params.id}, (err, thread) => {
    if(err) res.send(err)
    res.send(thread)
  })
}

module.exports = {
  createThread, getThread, getOne, update, remove
};
