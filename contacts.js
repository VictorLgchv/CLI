const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const searchContact = contacts.find((item) => item.id === String(contactId));

  return searchContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (indexContact === -1) {
    return null;
  }
  const deleteContact = contacts[indexContact];
  contacts.splice(indexContact, 1)

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return deleteContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
