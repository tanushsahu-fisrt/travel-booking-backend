const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// sequelize Connect
sequelize.sync()
.then(() => {
      console.log("Database connected")
      app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
      });
})
.catch(err => console.log(err));

