const { Contact } = require("../../model");

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete({
      _id: req.params.contactId,
    });

    if (contact) {
      return res.status(200).json({ message: "contact deleted" });
    }

    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
