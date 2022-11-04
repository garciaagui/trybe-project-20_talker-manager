const express = require('express');
const bodyParser = require('body-parser');
const readTalkers = require('./utils/handleJSON');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const talkers = await readTalkers();
    if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]); 
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});
app.listen(PORT, () => {
  console.log('Online');
});
