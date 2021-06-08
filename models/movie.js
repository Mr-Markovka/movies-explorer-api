const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
    minlength: [2, 'минимальная длина поля — 2 символа'],
    maxlength: [30, 'максимальная длина поля — 30 символов'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
    minlength: [2, 'минимальная длина поля — 2 символа'],
    maxlength: [30, 'максимальная длина поля — 30 символов'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },

  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
    minlength: [4, 'минимальная длина поля — 4 символа'],
    maxlength: [4, 'максимальная длина поля — 4 символов'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
    minlength: [2, 'минимальная длина поля — 2 символа'],
    maxlength: [30, 'максимальная длина поля — 300 символов'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле "image" должно быть заполнено utl-адресом',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле "trailer" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле "trailer" должно быть заполнено utl-адресом',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле "thumbnail" должно быть заполнено utl-адресом',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
    minlength: [2, 'минимальная длина поля — 2 символа'],
    maxlength: [30, 'максимальная длина поля — 30 символов'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
    minlength: [2, 'минимальная длина поля — 2 символа'],
    maxlength: [30, 'максимальная длина поля — 30 символов'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
