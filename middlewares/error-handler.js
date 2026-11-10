module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).send({
      message: Object.values(err.errors)
        .map((e) => e.message)
        .join(' '),
    });
    return;
  }
  res.status(500).send({ message: 'Ocorreu um erro no servidor' });
};
