const { Contact } = require("../../model");

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.contactId,
    });

    if (contact) {
      return res.status(200).json({ contact: { contact } });
    }

    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
