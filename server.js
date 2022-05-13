const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { CLIENT_URL, PORT, MONGO_URI, cookie } = require('./config');
const passport = require('passport');
let User = require('./models/user.model');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});
// =================Socket logic======================================
io.on('connection', (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  })
  socket.on("send_message", async (data) => {
  
// ====================================for sender end  ======================================================================
    const senderId = mongoose.Types.ObjectId(data.senderId);
    const recieverId = mongoose.Types.ObjectId(data.recieverId);
    const message = data.message;
    const float = data.float;
    const time = data.current_time;
    const details = await User.findById(senderId);
    const findData = await User.findOne({_id:senderId, conversations: { $elemMatch: { recieverId: recieverId } } });
    if (findData !== null) {

      await User.updateOne({ _id: senderId, "conversations.recieverId": recieverId }, { "$push": { "conversations.$.chats": { message: message, float: float, time: time } } })
    }
    else {
      const conversationsLength = details.conversations.length;
      details.conversations.push({ recieverId });
      details.conversations[conversationsLength].chats.push({ message: message, float: float, time: time })
      details.save();
    }
// ====================================for sender end  ======================================================================


// ====================================for reciever end  ======================================================================
try {
  const Recieverdetails = await User.findById(recieverId);
const findData1 = await User.findOne({_id:recieverId, conversations: { $elemMatch: { recieverId: senderId } } });
if (findData1 !== null) {
  await User.updateOne({ _id: recieverId, "conversations.recieverId": senderId }, { "$push": { "conversations.$.chats": { message: message, float: false, time: time } } })
}
else {
  const conversationsLength = Recieverdetails.conversations.length;
  Recieverdetails.conversations.push({ recieverId:senderId });
  Recieverdetails.conversations[conversationsLength].chats.push({ message: message, float: false, time: time })
  Recieverdetails.save();
}
} catch (error) {
  console.log(error);
}

// ====================================for reciever end  ======================================================================
    io.to(data.room).emit("recieve_message", data);
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
