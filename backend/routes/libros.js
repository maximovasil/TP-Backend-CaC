const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');

// GET all books
router.get('/', async (req, res) => {
  const libros = await Libro.findAll();
  res.json(libros);
});

// GET books by author ID
router.get('/autor/:id_autor', async (req, res) => {
  const libros = await Libro.findAll({
    where: { id_autor: req.params.id_autor }
  });
  res.json(libros);
});

// POST a new book
router.post('/', async (req, res) => {
  const nuevoLibro = await Libro.create(req.body);
  res.json(nuevoLibro);
});

// PUT (update) a book
router.put('/:id', async (req, res) => {
  await Libro.update(req.body, {
    where: { id_libro: req.params.id }
  });
  res.json({ success: 'Libro actualizado' });
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  await Libro.destroy({
    where: { id_libro: req.params.id }
  });
  res.json({ success: 'Libro eliminado' });
});

module.exports = router;
