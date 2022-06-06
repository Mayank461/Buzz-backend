const chat = require('../models/chat.model');

module.exports.getMyRooms = async (uid) => {
  try {
    if (!uid) throw Error('Not Authorized');

    const result = await chat
      .find({ users: { $in: uid } })
      .populate('users', 'firstname lastname picture_url')
      .sort({ updatedAt: 1 });

    return { status: 200, message: result };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports.sendMessage = async (roomID, messageData) => {
  try {
    if (!roomID.includes(messageData.sentBy))
      throw Error('Not Authorized to send message or invalid Room ID');

    if (messageData.message === '') throw Error('Message cannot be empty');

    const myChat = await chat.findById(roomID);
    if (myChat) {
      myChat.conversation.push(messageData);
      await myChat.save();
      return { status: 200, message: 'done' };
    }

    const newChat = new chat({
      _id: roomID,
      users: roomID.split('-'),
      conversation: [messageData],
    });

    await newChat.save();
    return { status: 200, message: 'done' };
  } catch (error) {
    console.log(error.message);
    return { status: 400, message: error.message };
  }
};

module.exports.seenMessages = async (roomID, uid) => {
  try {
    const res = await chat.findById(roomID);

    res?.conversation?.forEach((el) => {
      if (el?.sentBy.toString() !== uid && el.seen === false) el.seen = true;
    });

    await res?.save();
  } catch (error) {
    return { status: 400, message: error.message };
  }
};
