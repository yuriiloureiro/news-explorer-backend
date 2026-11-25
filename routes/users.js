const router = require('express').Router();
const { createUser, login, getCurrentUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../validators/users');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.get('/users/me', auth, getCurrentUser);

module.exports = router;
