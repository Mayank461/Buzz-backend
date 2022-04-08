const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
require('dotenv').config();
const cors = require('cors');
const { CLIENT_URL } = require('./config');
const passport = require('passport');

const app = express();

// middleware
app.use(
  cors({
    origin: CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

const session = cookieSession({
  secret: 'Session Secret',
  resave: true,
  saveUninitialized: true,
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/index'));

mongoose.connect(process.env.MONGO_URI, (err) => {
  !err && console.log('connected to database');
  err && console.log(err.message);
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running at port', PORT));
