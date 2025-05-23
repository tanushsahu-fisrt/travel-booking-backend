const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Flight = sequelize.define('Flight', {
  airline: DataTypes.STRING,
  origin: DataTypes.STRING,
  destination: DataTypes.STRING,
  departureTime: DataTypes.STRING,
  arrivalTime: DataTypes.STRING,
  price: DataTypes.FLOAT,
});

module.exports = Flight;
