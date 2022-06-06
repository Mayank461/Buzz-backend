const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { CLIENT_URL, PORT, MONGO_URI, cookie } = require('./config');
const passport = require('passport');
const { sendMessage, seenMessages } = require('./services/chat.service');

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
// const inRoom = {};

function roomCount(roomName) {
  if (io.sockets.adapter.rooms.has(roomName))
    return io.sockets.adapter.rooms.get(roomName).size;
  return 0;
}
io.on('connection', (socket) => {
  socket.on('join', (room, myID) => {
    socket.join(room);
    if (myID) {
      seenMessages(room, myID);
      io.to(room).emit('seen', room.split(myID).join('').split('-').join(''));
    }
  });
  socket.on('leave', (room) => {
    socket.leave(room);
  });

  socket.on('send-message', async (messageData, room) => {
    if (roomCount(room) > 1) messageData.seen = true;
    io.to(room).emit('receive-message', messageData);
    sendMessage(room, messageData);

    if (roomCount(room) < 2) {
      const notifySID = Object.keys(login_users).find(
        (key) =>
          login_users[key] ===
          room.replace(messageData.sentBy, '').replace('-', '')
      );
      notifySID && socket.to(notifySID).emit('refreshRoomsData');
    }
  });

  socket.on('notification', (notifyTo, message) => {
    const notifySID = Object.keys(login_users).find(
      (key) => login_users[key] === notifyTo
    );
    io.to(notifySID).emit('notification', message);
  });

  socket.on('notification_newPost', (notifyTo, name) => {
    Object.keys(login_users).forEach((key) => {
      if (notifyTo.includes(login_users[key])) {
        io.to(key).emit(
          'notification_newPost',
          `${name} just posted a new Post`
        );
      }
    });
  });

  function findID(id) {
    let res = null;
    Object.keys(login_users).forEach((key) => {
      if (login_users[key] === id) {
        res = key;
        return;
      }
    });
    return res;
  }

  socket.on('CallNotify', (id, from) => {
    io.to(findID(id)).emit('CallNotify', id, from);
  });

  socket.on('accept-video', (pid, id) => {
    socket.to(findID(id)).emit('accept-video', pid);
  });

  socket.on('disconnect-call', (id, data) => {
    socket.to(findID(id)).emit('disconnect-call', data);
  });

  socket.on('camToggle', (id, data) => {
    socket.to(findID(id)).emit('camToggle', data);
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
