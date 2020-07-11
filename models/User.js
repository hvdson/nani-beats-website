// Create Schema
const mongoose = require('mongoose');

//Create Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: String,
  isSubscribed: Boolean,
  stripeId: String,
  subscriptionPlan: String
});

const User = mongoose.model('users', UserSchema);
module.exports = User;