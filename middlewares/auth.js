const jwt = require('jsonwebtoken');
const { UnauthorizedErr } = require('../errors');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret',
    );
  } catch (err) {
    next(new UnauthorizedErr({ message: err.message }));
  }
  req.user = payload;

  next();
};
