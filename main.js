const yargs = require("yargs");
const chalk = require("chalk");

const { addContact, listContacts, removeContacts } = require("./contacts.js");

yargs.scriptName(`${chalk.yellow("Contacts Manager")}`);
yargs.usage(`$0 ${chalk.red("<command>")} ${chalk.green("[args]")}`);

yargs.version("1.0.1");

yargs.command({
  command: "create",
  aliases: ["c"],
  describe: `${chalk.blue("[Create New Account]")}`,
  builder: {
    fullname: {
      alias: "f",
      describe: "Full Name",
      demandOption: true,
      type: "string",
    },
    phone: {
      alias: "p",
      describe: "Phone",
      demandOption: true,
      type: "number",
    },
    email: {
      alias: "e",
      describe: "Email",
      demandOption: false,
      type: "string",
    },
  },
  handler(args) {
    addContact(args.fullname, args.phone, args.email);
  },
});

yargs.command({
  command: "list",
  aliases: ["l"],
  describe: `${chalk.blue("[Show The List Of Saved Contacts]")}`,
  handler() {
    listContacts();
  },
});

yargs.command({
  command: "remove",
  aliases: ["r"],
  describe: `${chalk.blue("[Remove The Contact]")}`,
  builder: {
    fullname: {
      alias: "f",
      describe: "Full name",
      demandOption: true,
    },
  },
  handler({ fullname }) {
    removeContacts(fullname);
  },
});

yargs.parse();
