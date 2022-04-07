let User = require('../models/user.model');

module.exports.getAll = async () => {
  return await User.find();
};

module.exports.updateUser = async (id, updateObj) => {
  try {
    await User.findByIdAndUpdate(id, updateObj);
    return { status: 200 };
  } catch (error) {
    console.log(error.message);
    return { status: 400, message: error.message };
  }
};

module.exports.sendRequest = async (loginUserId, friendId) => {
  try {
    const myUser = await User.findById(loginUserId);
    const friendUser = await User.findById(friendId);

    if (myUser.friends.myFriends.includes(friendId))
      throw new Error('Already added to your Friend list');

    myUser.friends.mySentRequests.push(friendUser._id);
    friendUser.friends.myFriendRequests.push(myUser._id);

    await friendUser.save();
    await myUser.save();

    return { status: 200, message: 'Friend request sent' };
  } catch (error) {
    return { status: 400, message: 'Already in your friend list' };
  }
};

module.exports.confirmRequest = async (loginUserId, friendId) => {
  try {
    const myUser = await User.findById(loginUserId);
    const friendUser = await User.findById(friendId);

    if (myUser.friends.myFriends.includes(friendId))
      throw new Error('Already added to your Friend list');

    //   remove from requests array
    myUser.friends.mySentRequests.pull(friendUser._id);
    friendUser.friends.myFriendRequests.pull(myUser._id);
    //   add to friend array
    myUser.friends.myFriends.push(friendUser._id);
    friendUser.friends.myFriends.push(myUser._id);

    return { status: 200, message: 'Request Confirmed' };
  } catch (error) {
    return { status: 400, message: 'Already in your friend list' };
  }
};

module.exports.deleteOrCancelRequest = async (loginUserId, friendId) => {
  try {
    const myUser = await User.findById(loginUserId);
    const friendUser = await User.findById(friendId);

    if (myUser.friends.myFriends.includes(friendId))
      return { status: 400, message: 'Already in your Friend list' };

    //   remove from requests array
    myUser.friends.mySentRequests.pull(friendUser._id);
    friendUser.friends.myFriendRequests.pull(myUser._id);

    myUser.friends.myFriendRequests.pull(friendUser._id);
    friendUser.friends.mySentRequests.pull(myUser._id);

    await friendUser.save();
    await myUser.save();

    return { status: 200, message: 'friend request cancelled' };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports.suggestUsers = async (id) => {
  try {
    const myUser = await User.findById(id);

    const ignoreFriendId = [
      id,
      ...myUser.friends.myFriends,
      ...myUser.friends.mySentRequests,
      ...myUser.friends.myFriendRequests,
    ];

    return await User.find({ _id: { $nin: ignoreFriendId } });
  } catch (error) {
    return { status: 400, message: error.message };
  }
};
