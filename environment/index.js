const constants = require('../constants');

const {
  CLIENT_NAME = 'http://localhost:5173',
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 8080,
  NODE_ENV = 'development',
} = process.env;

const JWT_SECRET = NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : constants.DEV_JWT;

console.log('Node env', process.env.NODE_ENV ?? 'environment is not specified, running development');
console.log(`host name ${CLIENT_NAME}`);

module.exports = {
  JWT_SECRET, CLIENT_NAME, DB_ADDRESS, PORT,
};
