const HTTP_BAD_REQUEST_STATUS = 400;
const DATE_REGEX = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

module.exports = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  if (!watchedAt || !watchedAt.length) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: 'O campo "watchedAt" é obrigatório', 
    });
  } if (!watchedAt.match(DATE_REGEX)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    });
  } 
    return next();
};