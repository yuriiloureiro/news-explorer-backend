const router = require('express').Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const auth = require('../middlewares/auth');
const {
  validateCreateArticle,
  validateArticleId,
} = require('../validators/articles');

router.get('/articles', auth, getArticles);
router.post('/articles', auth, validateCreateArticle, createArticle);
router.delete('/articles/:articleId', auth, validateArticleId, deleteArticle);

module.exports = router;
