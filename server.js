require('dotenv').config();
const mongoose = require('mongoose');
const { DB_ADDRESS, PORT } = require('./environment');

const app = require('./app');

mongoose.connect(DB_ADDRESS);

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
