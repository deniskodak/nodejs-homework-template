const jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../model");
const { createFolderIsNotExist } = require("../../middlewares");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const changeAvatar = async (req, res) => {
  const id = req.id;
  const { path: tmpPath, originalname } = req.file;

  const userFolder = path.join(avatarsDir, id);
  const uploadPath = path.join(userFolder, originalname);
  createFolderIsNotExist(userFolder);
  try {
    const imgFile = await jimp.read(tmpPath);
    imgFile.resize(250, 250).write(tmpPath);
    await fs.rename(tmpPath, uploadPath);

    const avatar = `/avatars/${id}/${originalname}`;

    await User.findByIdAndUpdate(id, { avatar });
    res.status(200).json({
      avatarURL: avatar,
    });
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
};

module.exports = changeAvatar;
