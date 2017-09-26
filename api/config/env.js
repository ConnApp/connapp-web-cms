const
  PORT = process.env.PORT || 3000,
  ROOT_PATH = process.env.PWD,
  DATABASE_URL = 'mongodb://super:admin@ds149763.mlab.com:49763/connapp-web-cms';

module.exports = {
  PORT,
  ROOT_PATH,
  DATABASE_URL
};