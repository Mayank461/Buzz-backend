let post = require('../models/post.model');

module.exports.updatePost = async (id, pic_url, caption) => {
  try {
    // let newpost = newpost.  
    await post({
      posted_by: id,
      post_url: pic_url,
      post_caption : caption
    }).save();

    return { status: 200 };
  } catch (error) {
    return { status: 400, message: error.message };

  }
};
module.exports.getPost = async (ids) => {
  try {
    // let newpost = newpost.  
   return await post.find({
    posted_by: {
        $in: ids
      }
    }).populate({
      path: "posted_by"
    });    
  } catch (error) {
    return { status: 400, message: error.message };

  }
};


module.exports.inclike = async (id,user_id) => {
  try {
    const mypost =await post.findById(id)
    mypost.like.includes(user_id)?
    mypost.like.pull(user_id):
    mypost.like.push(user_id)
    await mypost.save();
  
  return {status:200}
  }catch(error) {
    console.log(error);
  }
}

module.exports.dislike = async (id,user_id) => {
  try {
    const mypost =await post.findById(id)
    mypost.dislike.includes(user_id)?
    mypost.dislike.pull(user_id):
    mypost.dislike.push(user_id)
    await mypost.save();
  
  return {status:200}
  }catch(error) {
    console.log(error);
  }
}

module.exports.comment = async (id,message,user_id,picture_url) => {
  try {
    const mypost =await post.findById(id)
    mypost.comment.push({user_id,message,picture_url})
    // mypost.comment.includes(user_id,{message})?
    // mypost.comment.pull(user_id,{message}):
    // mypost.comment.push(user_id,{message})
    await mypost.save();
    // console.log(id);
    // console.log(message);
    // console.log(user_id);
    // console.log(picture_url);

  
  return {status:200}
  }catch(error) {
    console.log(error);
  }
}