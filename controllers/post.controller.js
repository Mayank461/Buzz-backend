const post = require('../services/post.service');

module.exports.updatePost = async (req, res) => {
  const { pic_url, caption, user_id } = req.body;
  
  const result = await post.updatePost(user_id, pic_url, caption);
  res.sendStatus(result.status);
};
