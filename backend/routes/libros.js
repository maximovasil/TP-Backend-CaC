const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');

// GET all books
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.findAll();
        return res.json(libros);
    } catch (err) {
        return res.status(500).json({ error: 'Error fetching books' });
    }
});

// GET books by author ID
router.get('/autor/:id_autor', async (req, res) => {
    try {
        const libros = await Libro.findAll({
            where: { id_autor: req.params.id_autor }
        });
        return res.json(libros);
    } catch (err) {
        return res.status(500).json({ error: 'Error fetching books by author' });
    }
});

// POST a new book
router.post('/', async (req, res) => {
    try {
        const nuevoLibro = await Libro.create(req.body);
        return res.json(nuevoLibro);
    } catch (err) {
        return res.status(500).json({ error: 'Error creating book' });
    }
});

// PUT (update) a book
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Libro.update(req.body, {
            where: { id_libro: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.json({ success: 'Book updated' });
    } catch (err) {
        return res.status(500).json({ error: 'Error updating book' });
    }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Libro.destroy({
            where: { id_libro: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.json({ success: 'Book deleted' });
    } catch (err) {
        return res.status(500).json({ error: 'Error deleting book' });
    }
});

module.exports = router;
