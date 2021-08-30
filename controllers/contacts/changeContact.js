const { Contact } = require("../../model");

const changeContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true }
    );

    if (contact) {
      return res.status(200).json({ contact: { contact } });
    }

    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = changeContact;
