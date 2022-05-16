const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    _id: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    conversation: [
      {
        timestamp: { type: Date, default: Date.now },
        message: { required: true, type: String },
        sentBy: { required: true, type: Schema.Types.ObjectId, ref: 'user' },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('chat', chatSchema);
