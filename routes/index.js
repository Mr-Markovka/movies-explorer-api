const router = require('express').Router();
const usersRouter = require('./users');

const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/index');
const {
  validateRegisterBody,
  validateLoginBody,
} = require('../middlewares/validation');

router.post('/signup', validateRegisterBody, createUser);
router.post('/signin', validateLoginBody, login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
