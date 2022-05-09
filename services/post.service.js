const mongoose = require('mongoose');
let user = require('../models/user.model');
let post = require('../models/post.model');
let reportData = require('../models/admin.model');

module.exports.allPost = async () => {
  try {
    return await reportData.find();
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports.delReport = async (id, post_uid) => {
  try {
    await reportData.deleteOne({ _id: id });
    await post.deleteOne({ _id: post_uid });

    return { status: 200 };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports.updatePost = async (id, pic_url, caption) => {
  try {
    await post({
      posted_by: id,
      post_url: pic_url,
      post_caption: caption,
    }).save();

    return { status: 200 };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};
module.exports.getPost = async (ids, page, limit) => {
  try {
    return await post
      .find({
        posted_by: {
          $in: ids,
        },
      })
      .populate({
        path: 'posted_by',
      })
      .sort({
        _id: -1,
      })
      .skip(page * limit)
      .limit(limit);
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports.inclike = async (id, user_id) => {
  try {
    const mypost = await post.findById(id).populate({
      path: 'posted_by',
    });

    mypost.dislike.includes(user_id) && mypost.dislike.pull(user_id);
    mypost.like.includes(user_id)
      ? mypost.like.pull(user_id)
      : mypost.like.push(user_id);

    await mypost.save();
    return mypost;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports.dislike = async (id, user_id) => {
  try {
    const mypost = await post.findById(id).populate({
      path: 'posted_by',
    });

    mypost.like.includes(user_id) && mypost.like.pull(user_id);

    mypost.dislike.includes(user_id)
      ? mypost.dislike.pull(user_id)
      : mypost.dislike.push(user_id);

    await mypost.save();

    return mypost;
  } catch (error) {
    console.log(error);
  }
};

module.exports.comment = async (id, message, user_id, picture_url) => {
  try {
    const mypost = await post.findById(id).populate({
      path: 'posted_by',
    });
    const replyBy = [];
    const likes=[];
    mypost.comment.push({ user_id, message, picture_url, replyBy,likes });
    await mypost.save();

    return mypost;
  } catch (error) {
    console.log(error);
  }
};

module.exports.report = async (data, user_id) => {
  try {
    var uid = mongoose.Types.ObjectId(user_id);
    const report_person = await user.findById(user_id);
    const existPost = await reportData.findOne({
      'reported_by._id': uid,
      post_url: data.data.post_url,
      post_caption: data.data.post_caption,
    });
    if (existPost === null) {
      await reportData({
        post_uid: data.data._id,
        post_url: data.data.post_url,
        posted_by: data.data.posted_by,
        post_caption: data.data.post_caption,
        reported_by: report_person,
      }).save();
      return { status: 200 };
    }
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
module.exports.commentReply = async (data,user) => {
  try {
    var postid = mongoose.Types.ObjectId(data.post_id);
    var cmntid = mongoose.Types.ObjectId(data.commentId);
    const postRec = await post.findOne({ "_id": postid }).populate({
      path: 'posted_by',
    });
    postRec.comment[data.index].replyBy.push({ repliedMessage: data.reply.message,senderPic:data.senderPic});
    await postRec.save();
    return postRec;
  } catch (error) {
    console.log(error);
  }
};
module.exports.commentLike = async (data,userId) => {
  try {

    var postid = mongoose.Types.ObjectId(data.post_id);
    var user = mongoose.Types.ObjectId(userId);
    
    const postRec = await post.findOne({ "_id": postid }).populate({
      path: 'posted_by',
    });
    postRec.comment[data.index].likes.includes(user)?postRec.comment[data.index].likes.pull(user):postRec.comment[data.index].likes.push(user);
    await postRec.save();
    return postRec;
  } catch (error) {
    console.log(error);
  }
};