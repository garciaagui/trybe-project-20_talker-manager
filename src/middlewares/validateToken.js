const HTTP_UNAUTHORIZED_STATUS = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token não encontrado', 
    });
  }
  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ 
      message: 'Token inválido', 
    });
  }
  return next();
};