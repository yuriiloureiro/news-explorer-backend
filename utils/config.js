require('dotenv').config();

const {
  NODE_ENV = 'development',
  PORT = 3000,
  MONGODB_URI,
  JWT_SECRET,
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  MONGODB_URI: MONGODB_URI || 'mongodb://localhost:27017/news_explorer_db',
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
