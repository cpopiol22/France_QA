const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['user', 'enterprise'], required: true },
  firstName: { type: String },
  lastName: { type: String },
  companyName: { type: String },
  description: { type: String },
  lookingForEmployment: { type: Boolean, default: false },
  lookingForFreelance: { type: Boolean, default: false },
  cv: { type: String },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);