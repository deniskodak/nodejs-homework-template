const express = require("express");
const router = express.Router();

const { validation, asyncWrapper } = require("../../middlewares");
const { joiSchemaAddContact, joiSchemaChangeContact } = require("../../model");

const {
  getAll,
  addContact,
  getContactById,
  removeContact,
  changeContact,
} = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:contactId", asyncWrapper(getContactById));

router.post("/", validation(joiSchemaAddContact), asyncWrapper(addContact));

router.delete("/:contactId", asyncWrapper(removeContact));

router.patch(
  "/:contactId",
  validation(joiSchemaChangeContact),
  asyncWrapper(changeContact)
);

router.put(
  "/:contactId",
  validation(joiSchemaAddContact),
  asyncWrapper(changeContact)
);

module.exports = router;
