let User = require('../models/user.model');

module.exports.updatePost = async (id, updateObj) => {
  return await User.findByIdAndUpdate(id, updateObj);
};
