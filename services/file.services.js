const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
  writer: async (users) => {
    await fs.writeFile(pathToFile, JSON.stringify(users));
  },

  reader: async () => {
    const buffer = await fs.readFile(pathToFile);
    return JSON.parse(buffer.toString());
  }
}
