const readTalkers = require('../utils/handleJSON');

const HTTP_NOT_FOUND_STATUS = 404;

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const talkers = await readTalkers();
    const isThisIdValid = talkers.some((t) => t.id === Number(id));

    if (isThisIdValid) return next();
    
    return res.status(HTTP_NOT_FOUND_STATUS)
      .send({ message: 'Pessoa palestrante não encontrada' });
  };