const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const getContacts = async function () {
  const response = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(response);
};

const findIdx = function (array, id) {
  const index = array.findIndex((item) => item.id === id);

  return index;
};

const updateJson = function (array) {
  const arrayStringed = JSON.stringify(array);
  fs.writeFile(contactsPath, arrayStringed);
};

module.exports = {
  getContacts,
  findIdx,
  updateJson,
};
