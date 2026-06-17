const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  fullName: {type: String, required: true,trim: true},
  email: {type: String, required: true,unique: true, trim: true,lowercase: true},
  phone: {type: String,trim: true },
  role: {type: String,default: 'Event Help'},
  skills: {type: String,trim: true},
  registrationDate: {type: Date,default: Date.now}
});

// Export the model so server.js can use it
module.exports = mongoose.model('Volunteer', VolunteerSchema);