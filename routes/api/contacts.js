const express = require("express");
const joiContactSchema = require("../../validation");
const router = express.Router();
const Contacts = require("../../model");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.status(200).json({ contacts: { contacts } });
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
  const { error } = joiContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({ contact: { contact } });
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
  if (!req.body || Object.keys(req.body).length === 0) {
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

    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
