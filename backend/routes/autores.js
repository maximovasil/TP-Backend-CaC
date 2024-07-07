const express = require('express');
const router = express.Router();
const Autor = require('../models/autor');

// GET all authors
router.get('/', async (req, res) => {
  const autores = await Autor.findAll();
  res.json(autores);
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
