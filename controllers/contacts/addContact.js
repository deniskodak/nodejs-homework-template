const { Contact } = require("../../model");

const addContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    return res.status(201).json({ contact: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
