const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  // get cookies jwt
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'net ninja hash', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  }

  res.redirect('/login');
};

module.exports = { requireAuth };