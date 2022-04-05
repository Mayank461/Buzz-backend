const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const user = require('./models/userModel');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { CLIENT_URL } = require('./config');

// middleware

app.use(
  cors({
    origin: CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

const session = cookieSession({
  secret: 'sessionSecret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secureProxy: true,
    httpOnly: true,
    expires: 24 * 60 * 60 * 100,
  },
});

app.use(session);
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
