const express = require('express');
const router = express.Router();
const Autor = require('../models/autor');

// GET all authors
router.get('/', async (req, res) => {
  const autores = await Autor.findAll();
  res.json(autores);
});

// GET author by ID
router.get('/:id', async (req, res) => {
  const autor = await Autor.findByPk(req.params.id);
  res.json(autor);
});

// POST a new author
router.post('/', async (req, res) => {
  const nuevoAutor = await Autor.create(req.body);
  res.json(nuevoAutor);
});

// PUT (update) an author
router.put('/:id', async (req, res) => {
  await Autor.update(req.body, {
    where: { id_autor: req.params.id }
  });
  res.json({ success: 'Autor actualizado' });
});

// DELETE an author
router.delete('/:id', async (req, res) => {
  await Autor.destroy({
    where: { id_autor: req.params.id }
  });
  res.json({ success: 'Autor eliminado' });
});

module.exports = router;
