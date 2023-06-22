const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result ?? null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [res] = allContacts.splice(index, 1);
  
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return res;
}

async function addContact({ name, email, phone }) {
  const newBook = {
    id: nanoid(),
    name,
    email,
    phone
  };

  const allContacts = await listContacts();
  allContacts.push(newBook);
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newBook;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};