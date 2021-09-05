const { User } = require("../../model");

const logout = async (req, res, _) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });

  return res.status(204).json({});
};

module.exports = logout;
