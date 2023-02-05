const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// express
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://nodeninja:test12345678@node-auth-ninja.84kzujf.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-cookie', 'newUser=true');

//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

//   res.send('you got the cookie');
// });

// app.get('/read-cookies', (req, res) => {
//   // si cookie bisa diakses karena kita pake cookieParser coyyy...
//   // kirain teh pedah siga akses kana inspect console kitu 
//   const cookies = req.cookies;
//   console.log(cookies);

//   res.send(cookies);
// });