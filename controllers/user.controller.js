const { default: mongoose } = require('mongoose');
const user = require('../services/user.service');

module.exports.getAll = async (req, res) => {
  const result = await user.getAll();
  res.send(result);
};

module.exports.getUser = async (req, res) => {
  const user_id = mongoose.Types.ObjectId(req.params.id);

  const result = await user.getSpecificUser(user_id);
  res.send(result);
};

module.exports.sendRequest = async (req, res) => {
  const result = await user.sendRequest(req.user.id, req.params.id);
  res.sendStatus(result.status);
};

module.exports.confirmRequest = async (req, res) => {
  const result = await user.confirmRequest(req.user.id, req.params.id);
  res.sendStatus(result.status)
};

module.exports.deleteOrCancelRequest = async (req, res) => {
  const result = await user.deleteOrCancelRequest(req.user.id, req.params.id);
  res.sendStatus(result.status)
};

module.exports.updateProfile = async (req, res) => {
  const result = await user.updateUser(req.params.id, req.body);
  res.sendStatus(result.status);
};

module.exports.suggestUsers = async (req, res) => {
  const result = await user.suggestUsers(req.user.id);
  res.send(result);
};
module.exports.search = async (req, res) => {
  const result = await user.searchUsers(req.query.query);
  res.send(result);
};