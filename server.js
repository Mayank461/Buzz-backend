const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { CLIENT_URL, PORT, MONGO_URI, cookie } = require('./config');
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

app.set('trust proxy', 1);
app.use(cookieSession(cookie));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/index'));

mongoose.connect(MONGO_URI, (err) => {
  !err && console.log('connected to database');
  err && console.log(err.message);
});

const server = app.listen(PORT, () =>
  console.log('Server running at port', PORT)
);

const io = require('socket.io')();
io.attach(server, { cors: { origin: CLIENT_URL } });

const login_users = {};

io.on('connection', (socket) => {
  socket.on('join', (room) => socket.join(room));

  socket.on('send-message', (messageData, room) => {
    socket.to(room).emit('receive-message', messageData);
  });

  socket.on('notification', (notifyTo, message) => {
    const notifySID = Object.keys(login_users).find(
      (key) => login_users[key] === notifyTo
    );
    io.to(notifySID).emit('notification', message);
  });

  socket.on('login', (uid) => {
    if (uid) {
      login_users[socket.id] = uid;
      io.to(socket.id).emit('onlineList', Object.values(login_users));
      socket.broadcast.emit('online', uid);
    }
  });

  socket.on('disconnecting', () => {
    socket.broadcast.emit('offline', login_users[socket.id]);
    login_users[socket.id] && delete login_users[socket.id];
  });
});
