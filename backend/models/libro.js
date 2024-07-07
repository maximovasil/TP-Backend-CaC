const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Autor = require('./autor');

const Libro = sequelize.define('Libro', {
  id_libro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING
  },
  fecha_publicacion: {
    type: DataTypes.DATE
  },
  id_autor: {
    type: DataTypes.INTEGER,
    references: {
      model: Autor,
      key: 'id_autor'
    }
  }
}, {
  tableName: 'Libros',
  timestamps: false
});

module.exports = Libro;
