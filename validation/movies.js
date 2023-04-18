const { Joi, celebrate } = require('celebrate');
const { urlRegex } = require('../constants');

const validatePostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(urlRegex)),
    trailerLink: Joi.string().required().pattern(new RegExp(urlRegex)),
    thumbnail: Joi.string().required().pattern(new RegExp(urlRegex)),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const validateMovieIdInParams = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = { validatePostMovie, validateMovieIdInParams };
