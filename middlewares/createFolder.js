const fs = require("fs/promises");

const isAccesible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccesible(folder))) {
    fs.mkdir(folder);
  }
};

module.exports = createFolderIsNotExist;
