const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const AllContacts = await listContacts();
      console.table(AllContacts);
      break;

    case 'get':
      const oneContact = await getContactById(id);
      console.log(oneContact);
      break;

    case 'add':
      const contactToAdd = await addContact(name, email, phone);
      console.log(contactToAdd);
      break;

    case 'remove':
      const contactToDelete = await removeContact(id);
      console.log(contactToDelete);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

const start = async argv => {
  try {
    await invokeAction(argv);
  } catch (error) {
    console.log(error);
  }
};
start(argv);
