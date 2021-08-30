const { Contact } = require("../../model");

const getContactById = async (req, res, next) => {
  try {
    let contact = await Contact.findOne({
      _id: req.params.contactId,
    });
    console.log(req.params.contactId);
    if (contact) {
      res.status(200).json({ contact: { contact } });
      contact = {};
      return;
    }

    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
