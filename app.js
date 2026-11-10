const express = require('express');
const mongoose = require('mongoose');

const config = require('./utils/config');

const { PORT, MONGODB_URI } = config;

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('News Explorer API no ar!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
