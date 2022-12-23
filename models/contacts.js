const fs = require('fs/promises')
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json")

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(result)
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = await contacts.find(contact => contact.id === contactId);

    return result || null;
  } catch (error) {
    console.log(error.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = await contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    };

    const [result] = contacts.splice(index, 1)
    await updateContacts(contacts);

    return result;

  } catch (error) {
    console.log(error.message);
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body
    };
    contacts.push(newContact)
    await updateContacts(contacts);


  } catch (error) {
    console.log(error.message);
  }
}

const updateContactById = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId)
    if (index === -1) {
      return null;
    };
    contacts[index] = {contactId, ...body}
    await updateContacts(contacts);

    return contacts[index];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
