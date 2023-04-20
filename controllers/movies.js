const Movie = require('../models/movie');
const makeCatchForController = require('../utils/makeCatchForControllers');
const { NotFound, ForbiddenError } = require('../customErrors');
const { CARD_NOT_FOUND_MSG } = require('../constants');

function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .sort({ createdAt: -1 })
    .populate(['owner'])
    .then((movies) => res.send({ movies }))
    .catch(makeCatchForController(next));
}

async function postMovie(req, res, next) {
  const {
    country, director, duration,
    year, description, image, trailerLink,
    nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  const { _id: owner } = req.user;

  let movie;
  try {
    movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    movie = await movie.populate('owner');
  } catch (err) {
    makeCatchForController(next)(err);
  }

  return res.status(201).send({ movie });
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params._id)
    .populate(['owner'])
    .then(async (movie) => {
      if (!movie) {
        throw new NotFound(CARD_NOT_FOUND_MSG);
      }

      if (movie.owner.id !== req.user._id) {
        throw new ForbiddenError('You can\'t delete other people\'s movies');
      }

      await Movie.deleteOne({ _id: movie._id });

      return res.send({ movie });
    })
    .catch(makeCatchForController(next));
}

module.exports = { getMovies, postMovie, deleteMovie };
