const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Register Alumni
router.post('/register', async (req, res) => {
  const { name, email, password, graduationYear, occupation, bio } = req.body;
  try {
    let alumni = await Alumni.findOne({ email });
    if (alumni) return res.status(400).json({ msg: 'Alumni already exists' });

    alumni = new Alumni({
      name, email, password, graduationYear, occupation, bio,
    });

    await alumni.save();
    res.status(201).json({ msg: 'Alumni registered successfully!' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Login Alumni
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const alumni = await Alumni.findOne({ email });
    if (!alumni) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await alumni.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: alumni.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
