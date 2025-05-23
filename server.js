const express = require('express');
const connectMongo = require('./config/mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const { connectRabbit } = require('./utils/rabbitmq')

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flight');
const searchRoutes = require('./routes/search');

app.use('/api/auth', authRoutes);
app.use('/api/flight', flightRoutes);
app.use('/api/search', searchRoutes);

// MongoDB Connect
connectMongo();

// rabbitMQ connect
connectRabbit()
.then( () =>{
 console.log('RabbitMQ connected');
})
.catch( err => {
  console.error('Failed to connect RabbitMQ:', err);
});


// sequelize Connect
sequelize.sync()
.then(() => console.log("Database connected") )
.catch(err => console.log(err));

// server listener
app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
      }
);

