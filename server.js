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
let room = "";
// =================Socket logic======================================
io.on('connection', (socket) => {

  socket.on("join_room", (data) => {
    room=data.room;
    socket.join(data.room);
    socket.to(data.room).emit("getPeerId", data);
  })
  socket.on('transfer', (data)=>{
    io.emit('takeAway',data);
  })
  socket.on("send_message", async (data) => {

// ====================================for sender end  ======================================================================
    const senderId = mongoose.Types.ObjectId(data.senderId);
    const recieverId = mongoose.Types.ObjectId(data.recieverId);
    const message = data.message;
    const float = data.float;
    const time = data.time;
    const details = await User.findById(senderId);
    const findData = await User.findOne({_id:senderId, conversations: { $elemMatch: { recieverId: recieverId } } });
    if (findData !== null) {
      if(data.pic === undefined){
      await User.updateOne({ _id: senderId, "conversations.recieverId": recieverId }, { "$push": { "conversations.$.chats": { message: message, float: float, time: time } } })
      }
      else{
      await User.updateOne({ _id: senderId, "conversations.recieverId": recieverId }, { "$push": { "conversations.$.chats": { message: message, pic:data.pic, float: float, time: time } } })
      }
    }
    else {
      const conversationsLength = details.conversations.length;
      index = conversationsLength;
      details.conversations.push({ recieverId });
      if(data.pic === undefined){
     details.conversations[conversationsLength].chats.push({ message: message, float: float, time: time })
      }
      else{
     details.conversations[conversationsLength].chats.push({ message: message, pic:data.pic, float: float, time: time })
      }
      details.save();
    }
// ====================================for sender end  ======================================================================


// ====================================for reciever end  ======================================================================
try {
  const Recieverdetails = await User.findById(recieverId);
const findData1 = await User.findOne({_id:recieverId, conversations: { $elemMatch: { recieverId: senderId } } });
if (findData1 !== null) {
  if(data.pic === undefined)
  {
    await User.updateOne({ _id: recieverId, "conversations.recieverId": senderId }, { "$push": { "conversations.$.chats": { message: message, float: false, time: time } } })
  }
  else{
  await User.updateOne({ _id: recieverId, "conversations.recieverId": senderId }, { "$push": { "conversations.$.chats": { message: message,pic:data.pic, float: false, time: time } } })
  }
}
else {
  const conversationsLength = Recieverdetails.conversations.length;
  Recieverdetails.conversations.push({ recieverId:senderId });
  if(data.pic===undefined)
  {
    Recieverdetails.conversations[conversationsLength].chats.push({ message: message, float: false, time: time })
  }
  else{
    Recieverdetails.conversations[conversationsLength].chats.push({ message: message,pic:data.pic, float: false, time: time })
  }
  Recieverdetails.save();
}
} catch (error) {
  console.log(error);
}

// ====================================for reciever end  ======================================================================
    io.to(data.room).emit("recieve_message", data);
  })

  socket.on("typing",(text)=>{
    socket.to(room).emit("recieve_signal",text);
})

socket.on('video-calling',(data)=>{
  socket.to(room).emit("accept-video",data);

})
socket.on('disconnect-call',(data)=>{
  io.to(room).emit("disconnection-both",data);

})
socket.on('call-decline',(data)=>{
  io.to(room).emit("call-rejected",data);

})
socket.on('connection-both',(data)=>{
  io.to(room).emit("remove-call-panel",data);

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
