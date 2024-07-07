const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Autor = sequelize.define('Autor', {
  id_autor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nacionalidad: {
    type: DataTypes.STRING
  },
  fecha_nacimiento: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Autores',
  timestamps: false
});

module.exports = Autor;
