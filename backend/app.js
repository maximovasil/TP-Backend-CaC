const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./db');
const Autor = require('./models/autor');
const Libro = require('./models/libro');

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const autoresRouter = require('./routes/autores');
const librosRouter = require('./routes/libros');

app.use('/api/autores', autoresRouter);
app.use('/api/libros', librosRouter);

// Sync database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error: ' + err));

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Fallback to index.html for SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
