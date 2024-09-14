const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');
const passport = require('passport');

// Get Profile
router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.user.id);
    res.json(alumni);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update Profile
router.put('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { occupation, bio } = req.body;
  try {
    const alumni = await Alumni.findById(req.user.id);
    if (occupation) alumni.occupation = occupation;
    if (bio) alumni.bio = bio;

    await alumni.save();
    res.json({ msg: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
