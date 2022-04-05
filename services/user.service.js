let User = require('../models/user.model');

module.exports.getAll = async () => {
  return await User.find();
};

module.exports.getByID = async (id) => {
  return await User.findById(id);
};

module.exports.updateUser = async (id, updateObj) => {
  return await User.findByIdAndUpdate(id, updateObj);
};
