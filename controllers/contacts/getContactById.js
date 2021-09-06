const { Contact } = require("../../model");

const getContactById = async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactId);

  if (contact) {
    return res.status(200).json({ contact: { contact } });
  }

  return res.status(404).json({ message: "Not found" });
};

module.exports = getContactById;
