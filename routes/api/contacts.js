const express = require("express");
const router = express.Router();

const {
  joiAddContactSchema,
  joiChangeContactSchema,
} = require("../../validation");
const Contacts = require("../../model");

router.get("/", async (_, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.status(200).json({ contacts: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);

    if (contact) {
      return res.status(200).json({ contact: { contact } });
    }

    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { error } = joiAddContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({ contact: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);

    if (contact) {
      return res.status(200).json({ message: "contact deleted" });
    }

    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  const { error } = joiChangeContactSchema.validate(req.body);
  const bodyLength = Object.keys(req.body).length;

  if (error || bodyLength === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );

    if (contact) {
      return res.status(200).json({ contact: { contact } });
    }

    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
