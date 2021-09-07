const registration = require("./register");
const removeUser = require("./removeUser");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const changeUser = require("./changeUser");

module.exports = {
  registration,
  removeUser,
  login,
  logout,
  getCurrentUser,
  changeUser,
};
