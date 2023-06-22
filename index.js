const { program } = require('commander');
const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case 'get':
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case 'remove':
      const removedContact = await contacts.removeContact(id);
      return console.log(removedContact);
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

program
  .version('0.1.0')
  .option('-A, --action <string>', 'Type of action')
  .option('-I, --id <string>', 'ID of contact')
  .option('-N, --name <string>', 'Name of contact')
  .option('-E, --email <string>', 'Email of contact')
  .option('-P, --phone <string>', 'Phone number of contact')
  .parse();

const options = program.opts();

invokeAction(options);