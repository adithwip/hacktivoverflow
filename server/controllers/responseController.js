const Response = require('../models/response');
const Thread = require('../models/thread');

function create (req, res) {
  let newResponse = new Response({
    responseContent: req.body.responseContent,
    creator: req.body.creator,
    parent: req.params.id,
    createdAt: new Date()
  })
  newResponse.save((err, createdResponse) => {
    if(err) {
      res.send(err)
    } else {
      Thread.findById(req.params.id, (err, thread) => {
        thread.replies.push(createdResponse)
        thread.save((err, updatedThread) => {
          res.send(err ? err : createdResponse)
        })
      })
    }
  })
}

function get (req, res) {
  Response.find({ parent: req.params.id })
  .populate('creator')
  .exec(function (err, responses) {
    res.send(err ? err : responses)
  })
}

function getOne (req, res) {
  Response.findById(req.params.repid)
  .populate('creator')
  .exec(function (err, responses) {
    res.send(err ? err : responses)
  })
}

function update (req, res) {
  Response.findById(req.params.repid, (err, response) => {
    if(response.creator == req.body.creator) {
      response.responseContent = req.body.responseContent || response.responseContent
      response.updatedAt = new Date()
      response.save((err, editedResponse) => {
        if(err) {
          res.send(err)
        } else {
          res.send(editedResponse)
        }
      })
    } else {
      res.send('Not authorized')
    }
  })
}

function remove (req, res) {
  Response.findOneAndRemove({_id: req.params.repid}, (err, response) => {
    if(err) res.send(err)
    Thread.findById(req.params.id, (err, thread) => {
      let idx = thread.replies.indexOf(response._id)
      thread.replies.splice(idx, 1)
      thread.save((err, updatedThread) => {
        res.send(err ? err : response)
      })
    })
  })
}

module.exports = {
  create, get, getOne, update, remove
};
