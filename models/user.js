const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O campo "name" é obrigatório'],
    minlength: [2, 'O nome deve ter no mínimo 2 caracteres'],
    maxlength: [30, 'O nome deve ter no máximo 30 caracteres'],
  },
  email: {
    type: String,
    required: [true, 'O campo "email" é obrigatório'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'E-mail inválido',
    },
  },
  password: {
    type: String,
    required: [true, 'O campo "password" é obrigatório'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
