require('dotenv').config();
const sec = process.env.TOKEN_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function login (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email }, function(err, user) {
    if(err) res.send(err);
    if(user) {
      bcrypt.compare(password, user.password)
      .then(result => {
        if(result) {
          var token = jwt.sign({id: user._id, name: user.name, email: user.email }, sec);
          res.send({token: token})
        } else {
          res.send({ msg: 'Incorrect password' });
        }
      })
      .catch(err => console.log(err))
    } else res.send({ msg: 'No such user' })
  })
}

function signup (req, res, next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  })
  newUser.save((err, user) => {
    if(err) {
      res.send(err.errors)
    } else res.send(user)
  })
}

function userInfo (req, res, next) {
  let token = req.body.token
  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(!err) {
        req.body.creator = decoded.id;
        next()
      } else {
        res.send(err)
      }
    })
  } else {
    res.send({msg: 'Not logged in'})
  }
}

function userData (req, res, next) {
  let token = req.body.token

  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(!err) {
        res.send(decoded)
      } else {
        res.send(err)
      }
    })
  } else {
    res.send({msg: 'Not logged in'})
  }
}

function authUser (req, res, next) {
  let token = req.body.token

  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(decoded.id == req.params.id) {
        next()
      } else {
        res.send(err)
      }
    })
  } else {
    res.send({msg: 'Not logged in'})
  }
}

module.exports = {
  login, signup, userInfo, userData, authUser
};
