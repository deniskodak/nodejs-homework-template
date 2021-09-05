const { User } = require("../../model");

const changeUser = async (req, res, _) => {
  const user = req.user;

  const subscription = req.body.subscription;

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { subscription },
    {
      new: true,
    }
  );

  return res.status(200).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = changeUser;
