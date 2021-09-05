const express = require("express");
const router = express.Router();

const { validation } = require("../../middlewares");
const { joiSchemaAddContact, joiSchemaChangeContact } = require("../../model");

const {
  getAll,
  addContact,
  getContactById,
  removeContact,
  changeContact,
} = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:contactId", getContactById);

router.post("/", validation(joiSchemaAddContact), addContact);

router.delete("/:contactId", removeContact);

router.patch("/:contactId", validation(joiSchemaChangeContact), changeContact);

router.put("/:contactId", validation(joiSchemaAddContact), changeContact);

module.exports = router;
