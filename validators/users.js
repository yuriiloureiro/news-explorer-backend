const { celebrate, Joi } = require('celebrate');

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'O nome deve ter no mínimo 2 caracteres',
        'string.max': 'O nome deve ter no máximo 30 caracteres',
        'any.required': 'O campo "name" é obrigatório',
        'string.empty': 'O campo "name" é obrigatório',
      }),
    email: Joi.string().required().email().messages({
      'string.email': 'E-mail inválido',
      'any.required': 'O campo "email" é obrigatório',
      'string.empty': 'O campo "email" é obrigatório',
    }),
    password: Joi.string().required().messages({
      'any.required': 'O campo "password" é obrigatório',
      'string.empty': 'O campo "password" é obrigatório',
    }),
  }),
});

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'E-mail inválido',
      'any.required': 'O campo "email" é obrigatório',
    }),
    password: Joi.string().required().messages({
      'any.required': 'O campo "password" é obrigatório',
    }),
  }),
});
