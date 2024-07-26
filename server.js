require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api', authRoutes);
app.use('/api', todoRoutes);
app.use('/api', sessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
