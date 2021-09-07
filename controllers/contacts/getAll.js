const { Contact } = require("../../model");

const getAll = async (req, res, __) => {
  const { page = 1, limit = 10, favorite } = req.query;

  let query = {};

  if (favorite) {
    query = { favorite };
  }

  const options = {
    page,
    limit,
  };

  const contacts = await Contact.paginate(query, options);
  res.status(200).json({ data: { contacts } });
};

module.exports = getAll;
