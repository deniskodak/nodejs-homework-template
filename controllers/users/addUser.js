const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const { User } = require("../../model");

const addUser = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  
  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
  });
  res.status(201).json({ User: newUser });
};

module.exports = addUser;
