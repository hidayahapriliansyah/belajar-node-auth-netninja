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

// fire something after save to db. jalan
userSchema.post('save', function (doc, next) {
  console.log('User saved', doc);
  next();
});

// fire function excatly before about to save to db.
// fungsi ini akan kita manfaatkan untuk hashing password sebelum save ke db
// pre ini gak punya akses ke doc, yang mana doc adalah hasil data yang udah ke save
// tapi kita bisa ngakses this yang mana ini merupakan hasil User.create()
// sementara sebelum di save. 

userSchema.pre('save', function (next) {
  console.log('before save', this);
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;