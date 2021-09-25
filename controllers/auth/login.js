const { User } = require("../../model");
const { Unauthorized, BadRequest } = require("http-errors");

const login = async (req, res, _) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw new BadRequest("Email не подтверждён");
  }

  user.setToken();
  console.log(user);
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
