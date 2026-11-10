const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET } = require('../utils/config');

const SALT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Já existe um usuário com este e-mail'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new UnauthorizedError('E-mail e senha são obrigatórios'));
    return;
  }

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('E-mail ou senha incorretos');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('E-mail ou senha incorretos');
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        });
        res.send({ token });
      });
    })
    .catch(next);
};
