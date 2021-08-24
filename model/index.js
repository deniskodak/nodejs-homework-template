const { v4 } = require("uuid");
const helpers = require("./helpers");

const listContacts = async () => {
  return await helpers.getContacts();
};

const getContactById = async (contactId) => {
  const contacts = await helpers.getContacts();
  const searchedIndex = helpers.findIdx(contacts, contactId);
  if (searchedIndex < 0) {
    return;
  }
  return contacts[searchedIndex];
};

const removeContact = async (contactId) => {
  const contacts = await helpers.getContacts();
  const searchedIndex = helpers.findIdx(contacts, contactId);

  if (searchedIndex < 0) {
    return;
  }

  const newContacts = contacts.filter((_, index) => index !== searchedIndex);
  helpers.updateJson(newContacts);

  return contacts[searchedIndex];
};

const addContact = async (body) => {
  const contacts = await helpers.getContacts();

  const contact = {
    id: v4(),
    ...body,
    ...(body.phone ? {} : { phone: null }),
  };

  contacts.push(contact);
  helpers.updateJson(contacts);

  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await helpers.getContacts();
  const searchedIndex = helpers.findIdx(contacts, contactId);

  if (searchedIndex < 0) {
    return;
  }

  Object.assign(contacts[searchedIndex], body);
  helpers.updateJson(contacts);

  return contacts[searchedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
