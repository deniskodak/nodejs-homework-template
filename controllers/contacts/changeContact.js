const { Contact } = require("../../model");

const changeContact = async (req, res, next) => {
  const bodyLength = Object.keys(req.body).length;
  try {
    if (bodyLength < 1) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const contact = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ contact: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = changeContact;
