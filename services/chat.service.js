const chat = require('../models/chat.model');

module.exports.getChatByRoomID = async (uid, roomID) => {
  try {
    if (!uid) throw Error('Not Authorized');
    if (!roomID.includes(uid)) throw Error('Invalid Room ID');

    const result = await chat
      .findById(roomID)
      .populate('users', 'firstname lastname picture_url');

    return { status: 200, message: result };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports.sendMessage = async (roomID, sentBy, message = '') => {
  try {
    if (!roomID.includes(sentBy))
      throw Error('Not Authorized to send message or invalid Room ID');

    if (message === '') throw Error('Message cannot be empty');

    const myChat = await chat.findById(roomID);
    if (myChat) {
      myChat.conversation.push({ message, sentBy });
      await myChat.save();
      return { status: 200, message: 'done' };
    }

    const newChat = new chat({
      _id: roomID,
      users: roomID.split('-'),
      conversation: [{ message, sentBy }],
    });

    await newChat.save();
    return { status: 200, message: 'done' };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};
