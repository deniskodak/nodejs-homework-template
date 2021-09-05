const { User } = require("../../model");

const removeUser = async (req, res, next) => {
  const removedUser = await User.findByIdAndDelete(req.params.userId);
  if (removedUser) {
    res.status(200).json({
      message: "user deleted",
    });
  }

  res.status(400).json({ message: "not found" });
};

module.exports = removeUser;
