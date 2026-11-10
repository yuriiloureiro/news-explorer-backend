const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Autorização necessária'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      next(new UnauthorizedError('Autorização necessária'));
      return;
    }

    User.findById(payload._id)
      .then((user) => {
        if (!user) {
          throw new UnauthorizedError('Usuário não encontrado');
        }
        req.user = user;
        next();
      })
      .catch(next);
  });
};
