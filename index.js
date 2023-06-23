const { argv } = require('yargs');
const contacts = require('./contacts')
const arg = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      return console.table(contactsList)
      break;

    case 'get':
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
      break;

    case 'add':
      const addContact = await contacts.addContact(name, email, phone);
      return console.log(addContact)
      break;

    case 'remove':
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv)