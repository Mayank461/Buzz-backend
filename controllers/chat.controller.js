const chat = require('../services/chat.service');

module.exports.sendMessage = async (req, res) => {
  const roomID = req.body.roomID;
  const message = req.body.message;
  const uid = req?.user?.id;
  const result = await chat.sendMessage(roomID, uid, message);
  res.send(result);
};

module.exports.getChatByRoomID = async (req, res) => {
  const uid = req?.user?.id;
  const roomID = req.params.roomID;
  const result = await chat.getChatByRoomID(uid, roomID);
  res.send(result);
};
