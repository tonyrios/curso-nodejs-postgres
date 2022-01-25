const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const { dbHost, dbPort, dbPassword, dbUser, dbName } = config;
const URI = `mariadb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'mariadb',
  },
  production: {
    url: URI,
    dialect: 'mariadb',
  }
}
