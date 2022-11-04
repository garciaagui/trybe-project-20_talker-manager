const { readFile } = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, '../talker.json');

async function readTalkers() {
  try {
    const talkers = JSON.parse(await readFile(filePath));
    return talkers;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
  }
}

module.exports = readTalkers;