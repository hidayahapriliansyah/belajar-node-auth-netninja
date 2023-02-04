const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true, // unique tidak bisa sembarangan pakai array validation harus pakai error code engke
    lowercase: true,
    validate: [ isEmail, 'Please enter valid email' ],
  },
  password: {
    type: String,
    required: [ true, 'Please enter password'],
    minlength: [ 6, 'Password min length is 6' ],
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;