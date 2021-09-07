const { Contact } = require("../../model");

const changeContact = async (req, res, _) => {
  const bodyLength = Object.keys(req.body).length;
  if (bodyLength < 1) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json({ contact: { contact } });
};

module.exports = changeContact;
