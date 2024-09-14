const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define Alumni Schema
const AlumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  occupation: { type: String, required: true },
  bio: { type: String },
});

// Password hashing before saving
AlumniSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
AlumniSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Alumni', AlumniSchema);
