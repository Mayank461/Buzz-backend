const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const postSchema = new mongoose.Schema({
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  post_url: { type: String },
  post_caption: { type: String },
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  dislike: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  comment: [
    {
      user_id: { type: String },
      message: { type: String },
      picture_url: { type: String },
      reply: [
        {
          user_id: { type: Schema.Types.ObjectId, ref: 'user' },
          message: { type: String },
          timestamp: { type: Date, default: Date.now },
          likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
        },
      ],
    },
  ],
  // report:[{
  //   type: Schema.Types.ObjectId, ref: 'user'
  // }]
});

module.exports = mongoose.model('post', postSchema);
