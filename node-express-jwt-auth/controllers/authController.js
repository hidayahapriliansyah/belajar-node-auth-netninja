const User = require('../models/User');

const handleError = (err) => {
  let errors = { email: '', password: '' };

  if (err.code === 11000) {
    // error code 11000 merupakan code dari error dari mongodb nya cok
    errors.email = 'Email already registered. Please Register with another email'  
    return errors;
  }

  // validation error
  if(err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signup_get = (req, res) => {
  res.render('signup');
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};

const login_get = (req, res) => {
  res.render('login');
};

const login_post = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  res.send('login');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};