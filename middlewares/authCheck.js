const user = require('../models/user.model');

module.exports = async (req, res, next) => {
  try {
    if (req.user.id) {
      const data = await user.findById(req.user.id);
      data && next();
    }
  } catch (error) {
    res.send({ status: 404, message: 'Not Authorized' });
  }
};
