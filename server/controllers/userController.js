require('dotenv').config();
const saltRounds = Number(process.env.SALT_ROUNDS);

var bcrypt = require('bcrypt');
var User = require('../models/user');

function createNewUser (req, res) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    password: hash
  })
  newUser.save((err, createdUser) => {
    if(err) {
      res.send(err)
    } else {
      res.send(createdUser)
    }
  })
}

function getAllUsers (req, res) {
  User.find(function (err, users) {
    res.send(err ? err : users)
  });
}

function getOne (req, res) {
  User.findById(req.params.id, (err, user) => {
    res.send(err ? err: user)
  })
}

function updateOne (req, res) {
  User.findById(req.params.id, (err, user) => {
    if(err) {
      res.send(err)
    } else {
      if(req.body.password) {
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(req.body.password, salt);
        user.password = hash;
      }
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.save((err, editedUser) => {
        if(err) {
          res.send(err)
        } else {
          res.send(editedUser)
        }
      })
    }
  })
}

function removeOne (req, res) {
  User.findOneAndRemove({_id: req.params.id}, (err, user) => {
    if(err) res.send(err)
    res.send(user)
  })
}

module.exports = {
  createNewUser, getAllUsers, getOne, updateOne, removeOne
};
