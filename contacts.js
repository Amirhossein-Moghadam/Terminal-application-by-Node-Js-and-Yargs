const fs = require("fs");
const chalk = require("chalk");

const addContact = (fullname, phone, email) => {
  const contacts = loadContacts();
  const duplicateContacts = contacts.find(
    (c) =>
      c.fullname.toLocaleLowerCase() === fullname.toLocaleLowerCase() &&
      c.phone === phone
  );
  if (!duplicateContacts) {
    contacts.push({ fullname, phone, email: email || "" });
    saveContacts(contacts);
    console.log(chalk.green("Contact saved."));
  } else {
    console.log(chalk.yellow("Contact already exist. "));
  }
};

const loadContacts = () => {
  try {
    const bufferData = fs.readFileSync("contacts.json");
    const contacts = bufferData.toString();
    return JSON.parse(contacts);
  } catch (error) {
    console.log(chalk.red("Error: ", error));
    return [];
  }
};

const listContacts = () => {
  const contacts = loadContacts();
  if (contacts.length > 0) {
    console.log(chalk.bgMagenta(`Your Contacts: (${contacts.length} Items)\n`));
    console.table(contacts);
    // contacts.forEach((c, i) => {
    //   console.log(
    //     `${i + 1})`,
    //     chalk.cyan(`${c.fullname} - ${c.phone} - ${c.email}`)
    //   );
    // });
  } else {
    console.log(chalk.red("You don't have any contacts."));
  }
};

const removeContacts = (fullname) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter(
    (c) => c.fullname.toLocaleLowerCase() !== fullname.toLocaleLowerCase()
  );
  if (contacts.length > filteredContacts.length) {
    console.log(chalk.green(`${fullname} has been removed.`));
  } else {
    console.log(chalk.red("Contact not found."));
  }
};

const saveContacts = (contacts) => {
  const data = JSON.stringify(contacts);
  fs.writeFileSync("contacts.json", data);
};

module.exports = {
  addContact,
  listContacts,
  removeContacts,
};
