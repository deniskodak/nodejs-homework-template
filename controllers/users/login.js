const { User } = require("../../model");
const { Unauthorized } = require("http-errors");

const login = async (req, res, _) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  user.setToken();
  user.save();

  return res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
