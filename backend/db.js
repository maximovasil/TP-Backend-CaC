const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cac_db', 'maxi', 'cac', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

sequelize.query("CREATE DATABASE IF NOT EXISTS cac_db;")
  .then(() => console.log('Database created if not exists...'))
  .catch(err => console.log('Error creating database: ' + err));

module.exports = sequelize;
