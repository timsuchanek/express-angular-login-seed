var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  env = process.env.NODE_ENV || 'development',
  config = require('../config/config')[env],
  BCRYPT_WORK_FACTOR = config.BCRYPT_WORK_FACTOR;

// User schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  },
  street: {
    type: String,
    required: false
  },
  streetNumber: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  twitter: {
    type: String,
    required: false,
    unique: true
  },
  facebook: {
    type: String,
    required: false,
    unique: true
  }
});

// Bcrypt middleware
UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(BCRYPT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export user model
var User = mongoose.model('User', UserSchema);
module.exports = User;