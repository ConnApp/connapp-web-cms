const
  PORT = process.env.PORT || 3000,
  ROOT_PATH = process.env.PWD,
  DATABASE_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/connapp-web-cms';

module.exports = {
  PORT,
  ROOT_PATH,
  DATABASE_URL
};