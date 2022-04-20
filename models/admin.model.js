const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const adminSchema = new mongoose.Schema({
  post_uid:{type:Schema.Types.ObjectId},
  post_url: String,
  post_caption:String,
  posted_by: {
    // type: Schema.Types.ObjectId, ref: 'user' 
  },
  reported_by: {}
 
});

module.exports = mongoose.model('report', adminSchema);
