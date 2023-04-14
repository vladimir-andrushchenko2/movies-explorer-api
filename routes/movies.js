const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

const { validatePostMovie, validateMovieIdInParams } = require('../validation');

router.get('/', getMovies);
router.post('/', validatePostMovie, postMovie);
router.delete('/:movieId', validateMovieIdInParams, deleteMovie);

module.exports = router;
