const express = require('express');
const router = express.Router();
const Autor = require('../models/autor');

// GET all authors
router.get('/', async (req, res) => {
    try {
        const autores = await Autor.findAll();
        return res.json(autores);
    } catch (err) {
        return res.status(500).json({ error: 'Error fetching authors' });
    }
});

// GET author by ID
router.get('/:id', async (req, res) => {
    try {
        const autor = await Autor.findByPk(req.params.id);
        if (!autor) {
            return res.status(404).json({ error: 'Author not found' });
        }
        return res.json(autor);
    } catch (err) {
        return res.status(500).json({ error: 'Error fetching author' });
    }
});

// POST a new author
router.post('/', async (req, res) => {
    try {
        const nuevoAutor = await Autor.create(req.body);
        return res.json(nuevoAutor);
    } catch (err) {
        return res.status(500).json({ error: 'Error creating author' });
    }
});

// PUT (update) an author
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Autor.update(req.body, {
            where: { id_autor: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Author not found' });
        }
        return res.json({ success: 'Author updated' });
    } catch (err) {
        return res.status(500).json({ error: 'Error updating author' });
    }
});

// DELETE an author
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Autor.destroy({
            where: { id_autor: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Author not found' });
        }
        return res.json({ success: 'Author deleted' });
    } catch (err) {
        return res.status(500).json({ error: 'Error deleting author' });
    }
});

module.exports = router;
