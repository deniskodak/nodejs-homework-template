const { User } = require("../../model");
const { Unauthorized, BadRequest } = require("http-errors");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const login = async (req, res, _) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw new BadRequest("Email не подтверждён");
  }

  const newAccessToken = jwt.sign({ id: user._id }, SECRET_KEY);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      token: newAccessToken,
    },
    { new: true }
  );

  return res.status(200).json({
    token: updatedUser.token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = login;
