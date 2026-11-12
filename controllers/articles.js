const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Artigo não encontrado');
      }
      if (String(article.owner) !== String(req.user._id)) {
        throw new ForbiddenError(
          'Não é permitido excluir artigos de outro usuário',
        );
      }
      return Article.deleteOne({ _id: article._id }).then(() => article);
    })
    .then((deleted) => res.send(deleted))
    .catch(next);
};
