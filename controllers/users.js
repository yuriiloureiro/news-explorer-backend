const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-error');

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
