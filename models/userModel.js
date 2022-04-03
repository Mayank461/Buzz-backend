let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  googleId: String,
  password: String,
  provider: String,
  isVerified: String,
  picture_url: String,
  cover_url: String,
  bio: String,
  gender: String,
  website: String,
  birthday: String,
  address: {
    city: { type: String },
    state: { type: String },
    zip: { type: Number },
  },
});

module.exports = mongoose.model('user', userSchema);
