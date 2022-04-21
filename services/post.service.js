let user = require('../models/user.model');
let post = require('../models/post.model');

module.exports.allPost = async () => {
  try {
    return await post.find();
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports.delReport = async (id) => {
  try {
     await post.deleteOne({_id:id}); 

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
    console.log(error);
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
    mypost.comment.push({ user_id, message, picture_url });
    await mypost.save();

    return mypost;
  } catch (error) {
    console.log(error);
  }
};
module.exports.report = async (id, user_id) => {
  try {    
    const mypost = await post.findById(id).populate({
      path: 'posted_by',
    });
    mypost.report.includes(user_id) ? '' : mypost.report.push(user_id);
    await mypost.save();

    return { status: 200 };
  } catch (error) {
    console.log(error);
  }
};
