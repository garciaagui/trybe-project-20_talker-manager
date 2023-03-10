const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate === undefined) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" é obrigatório',
    });
  } if (!Number.isInteger(rate) || Number(rate) < 1 || Number(rate) > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
    return next();
};