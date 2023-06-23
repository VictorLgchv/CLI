const { argv } = require('yargs');
const contacts = require('./contacts')
const arg = require('yargs').argv;

// TODO: рефакторити
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
// invokeAction({action: 'list'});
// invokeAction({action: 'get', id: "e6ywwRe4jcqxXfCZOj_1e"});
// invokeAction({action: 'add', name: "Homer Simpson", email: "homer@gmail.com", phone: "124234234"});
// invokeAction({action: 'remove', id: "TtCvOfOMmGrESj0iQbII5"});