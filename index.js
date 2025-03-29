require('dotenv').config(); // Por si quieres usar process.env directamente aquí también

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sequelize
const db = require('./models'); // models/index.js exporta la instancia y sincroniza

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('¡Servidor Express + Sequelize corriendo!');
});

// Iniciar servidor
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
    return db.sequelize.sync(); // opcional: { force: true } o { alter: true }
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });