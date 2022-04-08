const post = require('../services/post.service');


module.exports.updatePost = async (req, res) => {
  const { pic_url, caption, user_id } = req.body;  
  const result = await post.updatePost(user_id, pic_url, caption);
  res.sendStatus(result.status);
};

module.exports.like = async (req, res) => {
  const result = await post.inclike(req.body.userspost);
  // res.sendStatus(result.status);
  // console.log(req.body.userspost);
  // // res.send('hello');
};


module.exports.unlike = async (req,res) => {
  res.send('hi');
}

module.exports.comment = async (req,res) => {
  res.send('hi');
}