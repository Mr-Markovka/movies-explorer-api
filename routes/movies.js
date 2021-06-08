const router = require('express').Router();

const {
  validateMovieId,
  validateCreateMovie,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// GET /movies возвращает все сохранённые пользователем фильмы
router.get('/', getMovies);

// POST /movies создаёт фильм с переданными в теле
// country,director,duration,year,description,image,trailer,nameRU,nameEN,thumbnail,movieId
router.post('/', validateCreateMovie, createMovie);

// DELETE /movies/movieId удаляет сохранённый фильм по id
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
