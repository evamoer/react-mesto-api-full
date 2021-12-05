const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходимо авторизоваться.');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'super-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться.'));
  }
  req.user = payload;
  next();
};
