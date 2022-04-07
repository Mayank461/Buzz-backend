let post = require('../models/user.model');

module.exports.updatePost = async (id, pic_url, caption) => {
  try {
    await post.updateOne({_id: id}, {
      $push: {
        posts: {
          $each: [
            {
              post_url: pic_url,
              post_caption: caption,
            },
          ],
        },
      },
    });

    return { status: 200 };
  } catch (error) {
    return { status: 400, message: error.message };

  }
};
