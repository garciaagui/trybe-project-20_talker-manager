const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers, updateTalkersData } = require('./utils/handleJSON');
const generateToken = require('./utils/generateToken');

const validateId = require('./middlewares/validateId');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateToken = require('./middlewares/validateToken');
const validateTalkerName = require('./middlewares/validateTalkerName');
const validateTalkerAge = require('./middlewares/validateTalkerAge');
const validateTalkerTalk = require('./middlewares/validateTalkerTalk');
const validateTalkerWatchedAt = require('./middlewares/validateTalkerWatchedAt');
const validateTalkerRate = require('./middlewares/validateTalkerRate');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await readTalkers();
    if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]); 
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post('/talker',
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateTalkerWatchedAt,
  validateTalkerRate, async (req, res) => {
  try {
    const talkers = await readTalkers();
    const lastId = talkers[talkers.length - 1].id;
    const newTalker = { id: lastId + 1, ...req.body };
  
    talkers.push(newTalker);
    updateTalkersData(talkers);
    return res.status(HTTP_CREATED_STATUS).json(newTalker);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.get('/talker/:id', validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readTalkers();
    const talkerById = talkers.find((t) => t.id === Number(id));
    return res.status(HTTP_OK_STATUS).json(talkerById);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.put('/talker/:id',
  validateId,
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateTalkerWatchedAt,
  validateTalkerRate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readTalkers();
    const talkerToUpdate = talkers.find((t) => t.id === Number(id));

    talkerToUpdate.name = name;
    talkerToUpdate.age = age;
    talkerToUpdate.talk = talk;
  
    updateTalkersData(talkers);
    return res.status(HTTP_OK_STATUS).json(talkerToUpdate);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  try {
    const token = generateToken();
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});