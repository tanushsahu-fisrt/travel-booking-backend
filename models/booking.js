const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bookings = sequelize.define('Bookings', {
  email : DataTypes.STRING,
  userId : DataTypes.STRING,
  airline: DataTypes.STRING,
  origin: DataTypes.STRING,
  destination: DataTypes.STRING,
  departureTime: DataTypes.STRING,
  arrivalTime: DataTypes.STRING,
  price: DataTypes.FLOAT,
});

module.exports = Bookings;
