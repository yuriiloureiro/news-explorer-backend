const { celebrate, Joi } = require('celebrate');

module.exports.validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'any.required': 'O campo "keyword" é obrigatório',
      'string.empty': 'O campo "keyword" é obrigatório',
    }),
    title: Joi.string().required().messages({
      'any.required': 'O campo "title" é obrigatório',
      'string.empty': 'O campo "title" é obrigatório',
    }),
    text: Joi.string().required().messages({
      'any.required': 'O campo "text" é obrigatório',
      'string.empty': 'O campo "text" é obrigatório',
    }),
    date: Joi.string().required().messages({
      'any.required': 'O campo "date" é obrigatório',
      'string.empty': 'O campo "date" é obrigatório',
    }),
    source: Joi.string().required().messages({
      'any.required': 'O campo "source" é obrigatório',
      'string.empty': 'O campo "source" é obrigatório',
    }),
    link: Joi.string().required().uri().messages({
      'string.uri': 'Link inválido para o artigo',
      'any.required': 'O campo "link" é obrigatório',
      'string.empty': 'O campo "link" é obrigatório',
    }),
    image: Joi.string().required().uri().messages({
      'string.uri': 'Link inválido para a imagem',
      'any.required': 'O campo "image" é obrigatório',
      'string.empty': 'O campo "image" é obrigatório',
    }),
  }),
});

module.exports.validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required()
      .messages({
        'string.length': 'ID de artigo inválido',
        'string.hex': 'ID de artigo inválido',
        'any.required': 'O parâmetro "articleId" é obrigatório',
      }),
  }),
});
