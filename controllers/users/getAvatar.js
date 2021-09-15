const getAvatar = async (req, res) => {
  const user = req.user;
  console.log(user);
  return res.status(200).json({
    avatarURL: user.avatarUrl,
  });
};

module.exports = getAvatar;
