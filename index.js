require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
const routes = require('./routes');

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('¡Servidor Express + Sequelize corriendo!');
});

db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });