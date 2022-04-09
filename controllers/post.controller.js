const post = require('../services/post.service');


module.exports.updatePost = async (req, res) => {
  const { pic_url, caption, user_id } = req.body;  
  const result = await post.updatePost(user_id, pic_url, caption);
  res.sendStatus(result.status);
};

module.exports.getPost = async (req, res) => {  
  const result = await post.getPost([req.user.id,...req.user.friends.myFriends]);
  res.send(result);

};

module.exports.like = async (req, res) => {  
  const result = await post.inclike(req.body.post_id,req.user.id);
  res.sendStatus(result.status);
 };


module.exports.unlike = async (req,res) => {
  const result = await post.dislike(req.body.post_id,req.user.id);
  res.sendStatus(result.status);
}

module.exports.comment = async (req,res) => {
  const result = await post.comment(req.body.post_id,req.body.comment.message,req.user.id,req.user.picture_url);
  res.sendStatus(result.status);
  // console.log(req.body);
}
module.exports.report = async (req,res) => {
  const result = await post.report(req.body.post_id,req.user.id);
  res.sendStatus(result.status);
//  console.log(req.body);
}

