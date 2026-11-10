const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const config = require('./utils/config');
const userRoutes = require('./routes/users');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGODB_URI } = config;

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

app.use(express.json());

app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('News Explorer API no ar!');
});

app.use('/', userRoutes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
