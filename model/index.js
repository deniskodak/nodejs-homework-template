const {
  Contact,
  joiSchemaAddContact,
  joiSchemaChangeContact,
} = require("./contacts");

const {
  User,
  joiSchemaAddUser,
  joiSchemaChangeUser,
  joiSchemaVerifyEmail,
} = require("./users");

module.exports = {
  Contact,
  joiSchemaAddContact,
  joiSchemaChangeContact,
  User,
  joiSchemaAddUser,
  joiSchemaChangeUser,
  joiSchemaVerifyEmail,
};
