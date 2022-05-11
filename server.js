const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { CLIENT_URL, PORT, MONGO_URI, cookie } = require('./config');
const passport = require('passport');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors: {
    origin: "*"
  }
});
// =================Socket logic======================================
io.on('connection',(socket)=>{
   socket.on("join_room",(data)=>{
     socket.join(data);
   })
   socket.on("send_message",(data)=>{
   io.to(data.room).emit("recieve_message",data);
   })
})
// =================Socket logic======================================

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

server.listen(PORT, () => console.log('Server running at port', PORT));
