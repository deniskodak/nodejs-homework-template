const { Conflict } = require("http-errors");
const { User } = require("../../model");

const registration = async (req, res, _) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    User: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = registration;
