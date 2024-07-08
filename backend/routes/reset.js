const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// Endpoint para reiniciar las tablas
router.post('/reset', async (req, res) => {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await sequelize.query('TRUNCATE TABLE Libros;');
    await sequelize.query('TRUNCATE TABLE Autores;');
    res.status(200).json({ message: 'Tablas reiniciadas exitosamente' });
  } catch (error) {
    console.error('Error al reiniciar las tablas:', error);
    res.status(500).json({ error: 'Error al reiniciar las tablas', details: error.message });
  }
});

module.exports = router;
