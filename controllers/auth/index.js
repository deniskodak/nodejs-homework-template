const verifyEmailByToken = require("./verifyEmailByToken");
const login = require("./login");
const logout = require("./logout");
const registration = require("./register");
const verifyEmailByPostRequest = require("./verifyEmailByPostRequest");

module.exports = {
  registration,
  login,
  logout,
  verifyEmailByToken,
  verifyEmailByPostRequest,
};
