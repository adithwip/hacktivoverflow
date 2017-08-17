var validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Nama harus diisi']
  },
  password: {
    type: String,
    required: [true, 'Password harus diisi']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function(v) {
      return validator.isEmail(v);
    }
  }
}, {
  timestamps: true
});

var User  = mongoose.model('User', userSchema);
userSchema.plugin(uniqueValidator);

module.exports = User;
