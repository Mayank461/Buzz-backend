const post = require('../services/post.service');

module.exports.updatePost = async (req, res) => {
  const { pic_url, caption } = req.body;
  const id = req.user.id;

  const result = await post.updatePost(id, pic_url, caption);
  res.sendStatus(result.status);
};
