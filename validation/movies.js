const { Joi, celebrate } = require('celebrate');

const validatePostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number(),
    year: Joi.string().required().length(4),
    description: Joi.string().required().min(2),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    thumbnail: Joi.string().required(),
    movieId: Joi.string().required(),
  }),
});

const validateMovieIdInParams = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = { validatePostMovie, validateMovieIdInParams };
