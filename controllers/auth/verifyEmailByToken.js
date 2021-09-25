const { User } = require("../../model");

const verifyEmailByToken = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verifyToken: verificationToken });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verifyToken: null,
  });

  return res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyEmailByToken;
