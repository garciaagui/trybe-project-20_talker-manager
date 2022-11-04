const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name || !name.length) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: 'O campo "name" é obrigatório', 
    });
  } if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: 'O "name" deve ter pelo menos 3 caracteres', 
    });
  } 
    return next();
};