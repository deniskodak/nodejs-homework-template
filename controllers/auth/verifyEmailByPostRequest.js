const { User } = require("../../model");
const { sendMail } = require("../../utils");

const verifyEmailByPostRequest = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Not found" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const data = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="http://localhost:3000/api/v1/users//verify/${user.verifyToken}">Подтверджение регистрации</a>`,
  };

  await sendMail(data);

  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = verifyEmailByPostRequest;
