require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const { limiter } = require('./middlewares/rateLimiter');
const errorHandlingMiddleware = require('./middlewares/errorHandling');
const celebrateErrorHandling = require('./middlewares/celebrateErrorHandling');
const { options } = require('./middlewares/corsOptions');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(helmet());
app.use('*', cors(options));
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

app.use('/', require('./routes'));

app.use(errorLogger);

// this is for Joi and celebrate
app.use(celebrateErrorHandling);

app.use(errorHandlingMiddleware);

module.exports = app;
