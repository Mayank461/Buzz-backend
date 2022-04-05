const user = require('../services/user.service');

module.exports.getAll = async (req, res) => {
  const response = await user.getAll();
  res.send(response);
};

module.exports.sendRequest = async (req, res) => {
  try {
    const myUser = await user.getByID(req.user.id);
    const friendUser = await user.getByID(req.params.id);

    if (myUser.friends.myFriends.includes(req.params.id))
      return res.status(400).send('Already added to your Friend list');

    myUser.friends.mySentRequests.push(friendUser._id);
    friendUser.friends.myFriendRequests.push(myUser._id);

    await friendUser.save();
    await myUser.save();

    res.send('friend request sent');
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports.confirmRequest = async (req, res) => {
  try {
    const myUser = await user.getByID(req.user.id);
    const friendUser = await user.getByID(req.params.id);

    if (myUser.friends.myFriends.includes(req.params.id))
      return res.status(400).send('Already in your Friend list');

    //   remove from requests array
    myUser.friends.mySentRequests.pull(friendUser._id);
    friendUser.friends.myFriendRequests.pull(myUser._id);
    //   add to friend array
    myUser.friends.myFriends.push(friendUser._id);
    friendUser.friends.myFriends.push(myUser._id);

    await friendUser.save();
    await myUser.save();

    res.send('friend added');
  } catch (error) {
    res.sendStatus(400);
    console.log(error.message);
  }
};

module.exports.deleteOrCancelRequest = async (req, res) => {
  try {
    const myUser = await user.getByID(req.user.id);
    const friendUser = await user.getByID(req.params.id);

    if (myUser.friends.myFriends.includes(req.params.id))
      return res.status(400).send('Already in your Friend list');

    //   remove from requests array
    myUser.friends.mySentRequests.pull(friendUser._id);
    friendUser.friends.myFriendRequests.pull(myUser._id);

    myUser.friends.myFriendRequests.pull(friendUser._id);
    friendUser.friends.mySentRequests.pull(myUser._id);

    await friendUser.save();
    await myUser.save();

    res.send('friend request cancelled');
  } catch (error) {
    res.sendStatus(400);
    console.log(error.message);
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    await user.updateUser(req.params.id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      designation: req.body.designation,
      website: req.body.website,
      gender: req.body.gender,
      birthday: req.body.birthday,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    });
  } catch (error) {
    res.sendStatus(400);
    console.log(error.message);
  }
};
