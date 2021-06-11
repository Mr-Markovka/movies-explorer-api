const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateRegisterBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля — 2 символа',
        'string.max': 'максимальная длина поля — 30 символов',
        'any.required': 'обязательное поле',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'обязательное поле',
      }),
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Невалидный email');
      })
      .messages({
        'any.required': 'обязательное поле',
      }),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required()
      .messages({
        'any.required': 'обязательное поле',
      }),
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Невалидный email');
      })
      .messages({
        'any.required': 'обязательное поле',
      }),
  }),
});

const validateChangeUserInfo = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30)
        .messages({
          'string.min': 'минимальная длина поля — 2 символа',
          'string.max': 'максимальная длина поля — 30 символов',
          'any.required': 'обязательное поле',
        }),
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isEmail(value)) {
            return value;
          }
          return helpers.message('Невалидный email');
        })
        .messages({
          'any.required': 'обязательное поле',
        }),
    })
    .unknown(true),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Не валидный id');
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required()
        .messages({
          'any.required': 'обязательное поле',
        }),
      director: Joi.string().required()
        .messages({
          'any.required': 'обязательное поле',
        }),
      duration: Joi.number().positive()
        .required()
        .messages({
          'any.required': 'обязательное поле',
        }),
      year: Joi.string()
        .required()
        .min(4)
        .max(4)
        .pattern(/^[1-9]+[0-9]*$/)
        .messages({
          'string.min': 'минимальная длина поля — 4 символа',
          'string.max': 'максимальная длина поля — 4 символа',
          'any.required': 'обязательное поле',
        }),
      description: Joi.string().required()
        .messages({
          'any.required': 'обязательное поле',
        }),
      image: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.message('Поле image заполнено некорректно');
        })
        .messages({
          'any.required': 'обязательное поле',
        }),
      trailer: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.message('Поле trailer заполнено некорректно');
        })
        .messages({
          'any.required': 'обязательное поле',
        }),
      thumbnail: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.message('Поле thumbnail заполнено некорректно');
        })
        .messages({
          'any.required': 'обязательное поле',
        }),
      nameRU: Joi.string()
        .required()
        .pattern(/^[а-яА-ЯёЁ0-9]+$/)
        .messages({
          'any.required': 'обязательное поле',
        }),
      nameEN: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9]+$/)
        .messages({
          'any.required': 'обязательное поле',
        }),
      movieId: Joi.number().integer().required().messages({
        'any.required': 'обязательное поле',
      }),
    })
    .unknown(true),
});

module.exports = {
  validateRegisterBody,
  validateLoginBody,
  validateMovieId,
  validateCreateMovie,
  validateChangeUserInfo,
};
