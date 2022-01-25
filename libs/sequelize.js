const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const { dbHost, dbPort, dbPassword, dbUser, dbName } = config;
const URI = `mariadb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI,{
  dialect: 'mariadb',
  logging: console.log,
});

setupModels(sequelize);

//sequelize.sync();

module.exports = sequelize;
