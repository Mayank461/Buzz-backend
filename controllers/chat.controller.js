const chat = require('../services/chat.service');

module.exports.sendMessage = async (req, res) => {
  const roomID = req.body.roomID;
  const message = req.body.message;
  const uid = req?.user?.id;
  const result = await chat.sendMessage(roomID, uid, message);
  res.send(result);
};

module.exports.getMyRooms = async (req, res) => {
  const uid = req?.user?.id;

  const result = await chat.getMyRooms(uid);
  res.send(result);
};
