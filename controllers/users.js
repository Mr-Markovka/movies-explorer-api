const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const SOLT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 1100;

const {
  BadRequestErr,
  UnauthorizedErr,
  ConflictErr,
} = require('../errors');

/* GET /users/me - возвращает информацию о текущем пользователе  */
const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('Пользователь с таким id не найден'))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Неверный id'));
      } else {
        next(err);
      }
    });
};

/* PATCH /users/me — обновляет профиль */
const changeUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequestErr('Введены невалидные данные');
  }
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('Пользователь с таким id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (
        err.name === 'MongoError'
        || err.code === MONGO_DUPLICATE_ERROR_CODE
      ) {
        next(new ConflictErr('Пользователь с переданным email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestErr('Невалидные данные'));
      } else {
        next(err);
      }
    });
};

/* POST /signup — создаёт пользователя с переданными в теле запроса name, email и password. */
const createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new UnauthorizedErr('Неправильные почта или пароль');
  }

  bcrypt
    .hash(req.body.password, SOLT_ROUNDS)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (
        err.name === 'MongoError'
        || err.code === MONGO_DUPLICATE_ERROR_CODE
      ) {
        next(new ConflictErr('Пользователь с переданным email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestErr('Невалидные данные'));
      } else {
        next(err);
      }
    });
};

/* POST /signin */
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedErr('Неправильные почта или пароль'));
    });
};

module.exports = {
  getUserInfo,
  changeUserInfo,
  createUser,
  login,
};
