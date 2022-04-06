const user = require('../services/user.service');

module.exports.getAll = async (req, res) => {
  const result = await user.getAll();
  res.send(result);
};

module.exports.sendRequest = async (req, res) => {
  const result = await user.sendRequest(req.user.id, req.params.id);
  res.sendStatus(result.status);
};

module.exports.confirmRequest = async (req, res) => {
  const result = await user.confirmRequest(req.user.id, req.params.id);
  res.sendStatus(result.status);
};

module.exports.deleteOrCancelRequest = async (req, res) => {
  const result = await user.deleteOrCancelRequest(req.user.id, req.params.id);
  res.sendStatus(result.status);
};

module.exports.updateProfile = async (req, res) => {
  const update = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    designation: req.body.designation,
    website: req.body.website,
    gender: req.body.gender,
    birthday: req.body.birthday,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  };
  const result = await user.updateUser(req.user.id, update);
  res.sendStatus(result.status);
};
