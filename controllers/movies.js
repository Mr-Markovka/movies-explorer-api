const Movie = require('../models/movie');
const { NotFoundError, BadRequestErr, ForbiddenErr } = require('../errors');

// GET /movies возвращает все сохранённые пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.statusCode === 404) {
        next(new NotFoundError(err.message));
      } else {
        next(err);
      }
    });
};

// POST /movies создаёт фильм с переданными в теле
// country,director,duration,year,description,image,trailer,nameRU,nameEN,thumbnail,movieId
const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Невалидные данные'));
      } else {
        next(err);
      }
    });
};

// DELETE /movies/movieId удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError('Фильм с указанным id не найдена'))
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        return next(new ForbiddenErr('Фильм с указанным id вам недоступен'));
      }
      return movie.remove().then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(err.message));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
