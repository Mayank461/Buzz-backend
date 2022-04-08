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

module.exports.inclike = async (id) => {
  try {
    // post.findOneAndUpdate(id,{
    //   $push:{like:id}
    // },{
    //   new:true
    // }).exec((err,result)=> {
    //   if(err){
    //     return res.status(404).json({error:error})
    //   }else{
    //     console.log(result)
    //   }
    // }) 
    await post.findByIdAndUpdate({_id: id}, {
      $push: {
        posts: {        
            $each: [
              {
                like: id
              },
            ],                  
        },
      },
    });
    

    return { status: 200 }; 
  }catch(error) {
    return {sataus:404, message: error.message}
  }
}