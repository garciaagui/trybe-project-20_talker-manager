const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = (req, res, next) => {
  const { email } = req.body;
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;

  if (!email || !email.length) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "email" é obrigatório',
    });
  } if (!email.match(EMAIL_REGEX)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } 
    return next();
};