const userModel = require('../models/userModel');
const router = require('./auth');

const express = require('express').Router();

router.get('/getUser', async (req, res) => {
  const user = await userModel.find();
  res.send(user);
});

router.post('/sendRequest/:id', async (req, res) => {
  try {
    const myUser = await userModel.findById(req.user.id);
    const friendUser = await userModel.findById(req.params.id);

    if (myUser.friends.myFriends.includes(req.params.id))
      return res.status(400).send('Already added to your Friend list');

    myUser.friends.mySentRequests.push(friendUser._id);
    friendUser.friends.myFriendRequests.push(myUser._id);

    await friendUser.save();
    await myUser.save();

    res.send('friend request sent');
  } catch (error) {
    res.sendStatus(400);
    console.log(error.message);
  }
});

router.post('/confirmRequest/:id', async (req, res) => {
  try {
    const myUser = await userModel.findById(req.user.id);
    const friendUser = await userModel.findById(req.params.id);

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
});

router.post('/deleteRequest/:id', async (req, res) => {
  try {
    const myUser = await userModel.findById(req.user.id);
    const friendUser = await userModel.findById(req.params.id);

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
});

module.exports = router;
