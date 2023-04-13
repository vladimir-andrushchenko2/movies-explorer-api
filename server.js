require('dotenv').config();

const mongoose = require('mongoose');

const app = require('./app');

const { PORT = 8080 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
