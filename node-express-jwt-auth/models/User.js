const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// fire function excatly before about to save to db.
// fungsi ini akan kita manfaatkan untuk hashing password sebelum save ke db
// pre ini gak punya akses ke doc, yang mana doc adalah hasil data yang udah ke save
// tapi kita bisa ngakses this yang mana ini merupakan hasil User.create()
// sementara sebelum di save. 

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;