const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  vendorId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  products: {
    type: [String],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3.0
  },
  joinedOn: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Vendor', vendorSchema);
