const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/alumni-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
