const { Router } = require('express');
const autController = require('../controllers/authController');

const route = Router();

route.get('/signup', autController.signup_get);
route.post('/signup', autController.signup_post);
route.get('/login', autController.login_get);
route.post('/login', autController.login_post);
route.get('/logout', autController.logout_get);

module.exports = route;