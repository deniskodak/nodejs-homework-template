const { Conflict } = require("http-errors");
const { User } = require("../../model");
const { sendMail } = require("../../utils");

const registration = async (req, res, _) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.setVerifyToken();

  const data = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="http://localhost:3000/api/v1/users//verify/${newUser.verifyToken}">Подтверджение регистрации</a>`,
  };

  await sendMail(data);

  newUser.save();

  res.status(201).json({
    User: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = registration;
