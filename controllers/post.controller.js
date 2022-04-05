const post = require('../services/post.service');

module.exports.updatePost = async (req, res) => {
  try {
    const { pic_url, caption } = req.body;
    const id = req.user.id;

    await post.updatePost(id, {
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

    res.send('updated');
  } catch (error) {
    res.sendStatus(400);
    console.log(error.message);
  }
};
