const { Contact } = require("../../model");

const addContact = async (req, res, _) => {
  const contact = await Contact.create(req.body);
  return res.status(201).json({ contact: { contact } });
};

module.exports = addContact;
